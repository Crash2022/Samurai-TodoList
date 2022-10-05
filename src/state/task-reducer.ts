import {TaskListType} from "../App";

type ActionTypes = RemoveTaskACType

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

export const REMOVE_TASK = 'REMOVE_TASK'
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => ({
    type: 'REMOVE_TASK',
    todolistId: todolistId,
    taskId: taskId
} as const )

export const taskReducer = (state: TaskListType, action: ActionTypes): TaskListType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }

        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}