import {todolistsAPI, TaskAPIType, TaskPriorities, TaskStatuses,
    UpdateTaskModelType, TasksResponseType, TodolistsResponseType} from '../api/todolistsAPI';
import {appSetStatusAC} from './app-reducer';
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from '../common/utils/errorUtils';
import {CreateTodolistACType, DeleteTodolistACType, SetTodolistsACType,} from './todolists-reducer';
import {put, call, takeEvery} from 'redux-saga/effects'
import {AxiosError, AxiosResponse} from 'axios';
import {appSelect} from './selectors';

// react-redux

// reducer
export type TasksListType = {
    [todolistId: string]: Array<TaskAPIType>
}

const initialState: TasksListType = {};

export const tasksReducer = (state: TasksListType = initialState, action: TasksActionTypes): TasksListType => {
    switch (action.type) {
        case 'DELETE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'CREATE_TASK': {
            const newTask: TaskAPIType = action.task;
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]};
        }

        // обработка тасок двумя кейсами
        // case 'UPDATE_TASK_STATUS': {
        //     return {...state, [action.todolistId]:
        //             state[action.todolistId].map( el => el.id === action.taskId ? {...el, status: action.status} : el)};
        // }
        // case 'UPDATE_TASK_TITLE': {
        //     return {...state, [action.todolistId]:
        //             state[action.todolistId].map( el => el.id === action.taskId ? {...el, title: action.title} : el)};
        // }

        // обработка тасок одним кейсом
        case 'UPDATE_TASK': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.taskId ? {...el, ...action.model} : el)
            };
        }

        case 'DELETE_TODOLIST': {
            // const {[action.todolistId]: [], ...rest} = {...state} //другой способ через деструктуризацию
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'CREATE_NEW_TODOLIST': {
            return {...state, [action.todolist.id]: []};
        }
        case 'SET_TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case 'SET_TASKS': {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
        }
        default:
            return state;
    }
}

/*-----------------------------------------------------------------------------------*/

// actions
export type TasksActionTypes =
    DeleteTaskACType |
    CreateTaskACType |
    //UpdateTaskStatusACType |
    //UpdateTaskTitleACType |
    UpdateTaskACType |
    CreateTodolistACType |
    DeleteTodolistACType |
    SetTodolistsACType |
    SetTasksACType;

export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE_TASK',
    todolistId,
    taskId
} as const)

export type CreateTaskACType = ReturnType<typeof createTaskAC>
export const createTaskAC = (task: TaskAPIType /*todolistId: string, titleInput: string*/) => ({
    type: 'CREATE_TASK', task
    /*todolistId,
    titleInput*/
} as const)

// *версия с объектом model для изменения статуса и тайтла таски
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE_TASK',
    todolistId,
    taskId,
    model
} as const)

export type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: Array<TaskAPIType>) => ({
    type: 'SET_TASKS',
    todolistId, tasks
} as const)

/*-----------------------------------------------------------------------------------*/

// обновление разных свойств таски в одной "санке"
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// react-redux-saga

export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/GET_TASKS', getTasksTC_WorkerSaga)
    yield takeEvery('TASKS/DELETE_TASK', deleteTaskTC_WorkerSaga)
    yield takeEvery('TASKS/CREATE_TASK', createTaskTC_WorkerSaga)
    yield takeEvery('TASKS/UPDATE_TASK', updateTaskTC_WorkerSaga)
}

export const getTasksTC = (todolistId: string) => ({type: 'TASKS/GET_TASKS', todolistId} as const)
export function* getTasksTC_WorkerSaga(action: ReturnType<typeof getTasksTC>): any {
    yield put(appSetStatusAC('loading'));
    const data: TasksResponseType = yield call(todolistsAPI.getTasks, action.todolistId)
    try {
        yield put(setTasksAC(action.todolistId, data.items));
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => ({type: 'TASKS/DELETE_TASK', todolistId, taskId} as const)
export function* deleteTaskTC_WorkerSaga(action: ReturnType<typeof deleteTaskTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<TodolistsResponseType> =
        yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
    try {
        yield put(deleteTaskAC(action.todolistId, action.taskId));
        yield put(appSetStatusAC('succeeded'));
    }
    catch(error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const createTaskTC = (task: TaskAPIType) => ({type: 'TASKS/CREATE_TASK', task} as const)
export function* createTaskTC_WorkerSaga(action: ReturnType<typeof createTaskTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: any =
        yield call(todolistsAPI.createTask, action.task)
    try {
        if (response.data.resultCode === 0) {
            yield put(createTaskAC(response.data.data.item));
            yield put(appSetStatusAC('succeeded'));
        } else {
            yield* handleServerAppErrorSaga(response.data);
        }
        yield put(appSetStatusAC('failed'));
    }
    catch(error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    ({type: 'TASKS/UPDATE_TASK', todolistId, taskId, domainModel} as const)
export function* updateTaskTC_WorkerSaga(action: ReturnType<typeof updateTaskTC>): any {
    // простой способ
    // const state = store.getState();
    // const task = state.tasks[action.todolistId].find((t:TaskAPIType) => t.id === action.taskId);

    // сложный способ
    const stateTasks = yield* appSelect(state => state.tasks)
    const task = stateTasks[action.todolistId].find((t:TaskAPIType) => t.id === action.taskId);

    // обработка ошибки
    if (!task) {
        // throw new Error('Task Not Found In The State'); // иной вариант предупреждения
        console.warn('Task Not Found In The State');
        return;
    }

    const apiModel: UpdateTaskModelType = {
        description: task.description,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...action.domainModel
    }

    const response: AxiosResponse<TodolistsResponseType<{ item: UpdateTaskModelType }>> =
        yield call(todolistsAPI.updateTask, action.todolistId, action.taskId, apiModel)
    try {
        if (response.data.resultCode === 0) {
            yield put(updateTaskAC(action.todolistId, action.taskId, action.domainModel));
        } else {
            yield* handleServerAppErrorSaga(response.data);
        }
    }
    catch(error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}