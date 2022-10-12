import {FilterType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionTypes =
    AddTodolistACType |
    RemoveTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType;

// export type AddTodolistActionType = {
//     type: 'ADD_NEW_TODOLIST'
//     title: string
//     todolistId: string //v1()
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

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => ({
    type: REMOVE_TODOLIST,
    id: todolistId
} as const)

export const ADD_NEW_TODOLIST = 'ADD_NEW_TODOLIST'
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => ({
    type: ADD_NEW_TODOLIST,
    title,
    todolistId: v1()
} as const)

export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    id, title
} as const)

export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: CHANGE_TODOLIST_FILTER,
    id, filter
} as const)

/*-----------------------------------------------------------------------------------*/

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodoListType> = [
    {id: todolistId1, title: 'Выучить', filter: 'all'},
    {id: todolistId2, title: 'Купить', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(t => t.id !== action.id);
        }
        case ADD_NEW_TODOLIST: {
            return [{id: action.todolistId, title: action.title, filter: 'all' as FilterType}, ...state];
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