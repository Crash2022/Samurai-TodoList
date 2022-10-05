import {TaskListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../components/Todolist";

type ActionTypes = RemoveTaskACType | AddTaskACType

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string
    title: string
}

export const REMOVE_TASK = 'REMOVE_TASK'
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => ({
    type: 'REMOVE_TASK',
    todolistId,
    taskId
} as const )

export const ADD_TASK = 'ADD_TASK'
export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => ({
    type: ADD_TASK,
    todolistId,
    title
} as const)

export const taskReducer = (state: TaskListType, action: ActionTypes): TaskListType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case ADD_TASK: {
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}