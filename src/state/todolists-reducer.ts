import {v1} from "uuid";
import {TodolistAPIType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
}

export let todolistId1 = v1();
export let todolistId2 = v1();

export let isLoading = true;

// иной метод типизации initialState
// type StateType = typeof initialState

// const initialState: Array<TodolistDomainType> = [
//     {id: todolistId1, title: 'Выучить', filter: 'all', addedDate: '', order: 0},
//     {id: todolistId2, title: 'Купить', filter: 'all', addedDate: '', order: 1}
// ]

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD_NEW_TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state];

            // return [{
            //     id: action.todolistId, title: action.title,
            //     filter: 'all' as FilterType, addedDate: '', order: 0
            // }, ...state];
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}));
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}

/*-----------------------------------------------------------------------------------*/

export type TodolistActionTypes =
    AddTodolistACType |
    RemoveTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType |
    SetTodolistsACType |
    IsLoadingACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE_TODOLIST',
    id: todolistId
} as const)

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistAPIType /*title: string*/) => ({
    type: 'ADD_NEW_TODOLIST', todolist
    // title,
    // todolistId: v1()
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

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistAPIType>) => ({
    type: 'SET_TODOLISTS',
    todolists
} as const)

export type IsLoadingACType = ReturnType<typeof isLoadingAC>
export const isLoadingAC = (isLoading: boolean) => ({
    type: 'IS_LOADING',
    isLoading
} as const)

/*-----------------------------------------------------------------------------------*/

// export const GetTodolistsThunk = (dispatch: Dispatch) => {
//     todolistsAPI.getTodolists()
//         .then(response => {
//             dispatch(setTodolistsAC(response));
//         })
// }

export const GetTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response));
            })
    }
}

export const DeleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const CreateTodolistTC = (todolist: TodolistDomainType /*title: string*/) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(todolist.title)
            .then(response => {
                //dispatch(addTodolistAC(todolist)) // ???
                dispatch(addTodolistAC(response.data.item))
            })
    }
}

export const UpdateTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(response => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}