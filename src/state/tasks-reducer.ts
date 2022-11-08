import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType,
    todolistId1, todolistId2} from "./todolists-reducer";
import {TaskAPIType, TaskPriorities, TaskStatuses, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";

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
            const newTask: TaskAPIType = {todoListId: action.todolistId, id: v1(), title: action.titleInput,
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, status: action.status} : el)};
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, title: action.title} : el)};
        }
        case 'REMOVE_TODOLIST': {
            // const {[action.todolistId]: [], ...rest} = {...state} //другой способ через деструктуризацию
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'ADD_NEW_TODOLIST': {
            return { ...state, [action.todolistId]: [] };
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
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
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
export const addTaskAC = (todolistId: string, titleInput: string) => ({
    type: 'ADD_TASK',
    todolistId,
    titleInput
} as const)

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    status
} as const)

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE_TASK_TITLE',
    todolistId,
    taskId,
    title
} as const)

export type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: Array<TaskAPIType>) => ({
    type: 'SET_TASKS',
    todolistId, tasks
} as const)

/*-----------------------------------------------------------------------------------*/

export const GetTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC(todolistId, response.items));
            })
    }
}