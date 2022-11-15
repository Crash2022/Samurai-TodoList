import {
    CreateTodolistACType, DeleteTodolistACType, SetTodolistsACType,
    todolistId1, todolistId2
} from "./todolists-reducer";
import {
    todolistsAPI, TaskAPIType, TaskPriorities, TaskStatuses,
    UpdateTaskModelType
} from "../api/todolistsAPI";
import {AppRootStateType, AppThunkType} from "./store";
import {appSetErrorAC} from "./app-reducer";

export type TasksListType = {
    [todolistId: string]: Array<TaskAPIType>
}

// иной метод типизации initialState
// type StateType = typeof initialState

// const initialState: TasksListType = {
//     [todolistId1]: [
//         {todoListId: 'todolistId1', id: v1(), title: 'HTML&CSS',
//             status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0},
//         {todoListId: 'todolistId1', id: v1(), title: 'React',
//             status: TaskStatuses.New, priority: TaskPriorities.Hi,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 1}
//     ],
//     [todolistId2]: [
//         {todoListId: 'todolistId2', id: v1(), title: 'Notebook',
//             status: TaskStatuses.New, priority: TaskPriorities.Low,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0},
//         {todoListId: 'todolistId2', id: v1(), title: 'New Bike',
//             status: TaskStatuses.Completed, priority: TaskPriorities.Later,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 1}
//     ]
// }

const initialState: TasksListType = {};

export const tasksReducer = (state: TasksListType = initialState, action: TasksActionTypes): TasksListType => {
    switch (action.type) {
        case 'DELETE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'CREATE_TASK': {
            /*const newTask: TaskAPIType = {todoListId: action.todolistId, id: v1(), title: action.titleInput,
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};*/

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
            // return { ...state, [action.todolistId]: [] };
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
            //throw new Error("I don't know action type!");
            return state;
    }
}

/*-----------------------------------------------------------------------------------*/

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

// *версия без объекта model
// export type UpdateTaskStatusACType = ReturnType<typeof updateTaskStatusAC>
// export const updateTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
//     type: 'UPDATE_TASK_STATUS',
//     todolistId,
//     taskId,
//     status
// } as const)
//
// export type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
// export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
//     type: 'UPDATE_TASK_TITLE',
//     todolistId,
//     taskId,
//     title
// } as const)

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

export const getTasksTC = (todolistId: string): AppThunkType => {
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC(todolistId, response.data.items));
            })
    }
}

export const createTaskTC = (task: TaskAPIType): AppThunkType => {
    return (dispatch) => {
        todolistsAPI.createTask(task)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // dispatch(addTaskAC(task)); // !!! так лучше не делать
                    dispatch(createTaskAC(response.data.data.item));
                } else {
                    if (response.data.messages) {
                        dispatch(appSetErrorAC(response.data.messages[0]));
                    } else {
                        dispatch(appSetErrorAC('Some Error'));
                    }
                }
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => {
                dispatch(deleteTaskAC(todolistId, taskId));
            })
    }
}

/*
// менее правильный и короткий вариант
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTask(todolistId, taskId, {title: title})
            .then(response => {
                dispatch(updateTaskTitleAC(todolistId, taskId, title));
            })
    }
}

// !правильный вариант!
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

        // обработка ошибки
        if(!task) {
            // throw new Error('Task Not Found In The State'); // иной вариант предупреждения
            console.warn('Task Not Found In The State');
            return;
        }

        const model: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(response => {
                dispatch(updateTaskStatusAC(todolistId, taskId, status));
            })
    }
}*/

// обновление разных свойств таски в одной "санке"
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
    return (dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

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
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(response => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel));
            })
    }
}