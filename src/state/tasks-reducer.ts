import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType,
    todolistId1, todolistId2} from "./todolists-reducer";
import {
    TaskAPIType,
    TaskPriorities,
    TaskStatuses,
    todolistsAPI,
    UpdateTaskModelType
} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

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

const initialState: TasksListType = { };

export const tasksReducer = (state: TasksListType = initialState, action: TaskActionTypes): TasksListType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'ADD_TASK': {
            /*const newTask: TaskAPIType = {todoListId: action.todolistId, id: v1(), title: action.titleInput,
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};*/

            const newTask: TaskAPIType = action.task;
            return {...state, [newTask.todoListId]: [newTask,...state[newTask.todoListId]]};
        }

        // обработка тасок двумя кейсами
        // case 'CHANGE_TASK_STATUS': {
        //     return {...state, [action.todolistId]:
        //             state[action.todolistId].map( el => el.id === action.taskId ? {...el, status: action.status} : el)};
        // }
        // case 'CHANGE_TASK_TITLE': {
        //     return {...state, [action.todolistId]:
        //             state[action.todolistId].map( el => el.id === action.taskId ? {...el, title: action.title} : el)};
        // }

        // обработка тасок одним кейсом
        case 'UPDATE_TASK': {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, ...action.model} : el)};
        }

        case 'REMOVE_TODOLIST': {
            // const {[action.todolistId]: [], ...rest} = {...state} //другой способ через деструктуризацию
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'ADD_NEW_TODOLIST': {
            return { ...state, [action.todolist.id]: [] };
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

export type TaskActionTypes =
    RemoveTaskACType |
    AddTaskACType |
    //ChangeTaskStatusACType |
    //ChangeTaskTitleACType |
    UpdateTaskACType |
    AddTodolistACType |
    RemoveTodolistACType |
    SetTodolistsACType |
    SetTasksACType;

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE_TASK',
    todolistId,
    taskId
} as const )

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskAPIType /*todolistId: string, titleInput: string*/) => ({
    type: 'ADD_TASK', task
    /*todolistId,
    titleInput*/
} as const)

// *версия без объекта model
// export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
// export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
//     type: 'CHANGE_TASK_STATUS',
//     todolistId,
//     taskId,
//     status
// } as const)
//
// export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
//     type: 'CHANGE_TASK_TITLE',
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

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC(todolistId, response.items));
            })
    }
}

export const createTaskTC = (task: TaskAPIType) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(task)
            .then(response => {
                // dispatch(addTaskAC(task)); // !!! так лучше не делать
                dispatch(addTaskAC(response.data.item));
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => {
                dispatch(removeTaskAC(todolistId, taskId));
            })
    }
}

/*
// менее правильный и короткий вариант
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTask(todolistId, taskId, {title: title})
            .then(response => {
                dispatch(changeTaskTitleAC(todolistId, taskId, title));
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
                dispatch(changeTaskStatusAC(todolistId, taskId, status));
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

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

        // обработка ошибки
        if(!task) {
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