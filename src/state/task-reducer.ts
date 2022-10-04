import {TaskListType} from "../App";
//import {v1} from "uuid";

type ActionTypes = RemoveTaskActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export const taskReducer = (state: TaskListType, action: ActionTypes): TaskListType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }

        default:
            throw new Error("I don't know action type!")
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskId: taskId
    }
}