import {FilterType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionTypes =
    AddTodolistACType |
    RemoveTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE_TODOLIST',
    id: todolistId
} as const)

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => ({
    type: 'ADD_NEW_TODOLIST',
    title,
    todolistId: v1()
} as const)

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    id, title
} as const)

export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id, filter
} as const)

/*-----------------------------------------------------------------------------------*/

export let todolistId1 = v1();
export let todolistId2 = v1();

// иной метод типизации initialState
// type StateType = typeof initialState

/*const initialState: Array<TodoListType> = [
    {id: todolistId1, title: 'Выучить', filter: 'all'},
    {id: todolistId2, title: 'Купить', filter: 'all'}
]*/

const initialState: Array<TodoListType> = [ ];

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD_NEW_TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: 'all' as FilterType}, ...state];
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}