import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionTypes =
    AddTodolistACType |
    RemoveTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType

// export type AddTodolistActionType = {
//     type: 'ADD_NEW_TODOLIST'
//     title: string
// }
// export type RemoveTodolistActionType = {
//     type: 'REMOVE_TODOLIST'
//     id: string
// }
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE_TODOLIST_TITLE'
//     id: string
//     title: string
// }
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE_TODOLIST_FILTER'
//     id: string
//     filter: FilterType
// }

export const ADD_NEW_TODOLIST = 'ADD_NEW_TODOLIST'
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => ({
    type: ADD_NEW_TODOLIST,
    title
} as const)

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => ({
    type: REMOVE_TODOLIST,
    id: todolistId
} as const)

export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    id: id,
    title
} as const)

export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: CHANGE_TODOLIST_FILTER,
    id: id,
    filter
} as const)

/*-----------------------------------------------------------------------------------*/

export const todolistReducer = (state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case ADD_NEW_TODOLIST: {
            return [{id: v1(), title: action.title, filter: 'all'}, ...state];
        }
        case REMOVE_TODOLIST: {
            return state.filter(t => t.id !== action.id);
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}