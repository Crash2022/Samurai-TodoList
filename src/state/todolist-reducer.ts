import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-NEW-TODOLIST': {
            return [{id: v1(), title: action.title, filter: 'all'} ,...state];
        }

        default:
            throw new Error("I don't know action type!")
    }
}