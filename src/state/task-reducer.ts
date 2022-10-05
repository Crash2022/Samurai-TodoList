import {TaskListType} from "../App";
import {v1} from "uuid";

type ActionTypes = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

/*export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}*/
/*export type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string
    title: string
}*/
/*export type ChangeTaskCheckboxActionType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}*/
/*export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    title: string
}*/

export const REMOVE_TASK = 'REMOVE_TASK'
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: REMOVE_TASK,
    todolistId,
    taskId
} as const )

export const ADD_TASK = 'ADD_TASK'
export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => ({
    type: ADD_TASK,
    todolistId,
    title
} as const)

export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => ({
    type: CHANGE_TASK_STATUS,
    todolistId,
    taskId,
    isDone
} as const)

export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: CHANGE_TASK_TITLE,
    todolistId,
    taskId,
    title
} as const)

export const taskReducer = (state: TaskListType, action: ActionTypes): TaskListType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case ADD_TASK: {
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};
        }
        case CHANGE_TASK_STATUS: {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)};
        }
        case CHANGE_TASK_TITLE: {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, title: action.title} : el)};
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}