import {TodolistAPIType, todolistsAPI} from "../api/todolistsAPI";
import {AppInitialStateStatusType, appSetErrorAC, appSetStatusAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// redux-toolkit
export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
    entityStatus: AppInitialStateStatusType
}

let initialState: Array<TodolistDomainType> = [];

export const getTodolistsTC = createAsyncThunk('todolists/getTodolists',
    async (param, {dispatch}) => {
        dispatch(appSetStatusAC({status: 'loading'}));

        try {
            const response = await todolistsAPI.getTodolists();
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {todolists: response.data};
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
        }
    })

export const deleteTodolistTC = createAsyncThunk('todolists/deleteTodolist',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}));

        try {
            const response = await todolistsAPI.deleteTodolist(todolistId);
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {todolistId};
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    })

export const createTodolistTC = createAsyncThunk('todolists/createTodolist',
    async (todolist: TodolistDomainType, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));

        try {
            const response = await todolistsAPI.createTodolist(todolist.title);
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {todolist: response.data.data.item};
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
)

export const updateTodolistTitleTC = createAsyncThunk('todolists/updateTodolist',
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({id: param.todolistId, entityStatus: 'loading'}));

        try {
            const response = await todolistsAPI.updateTodolist(param.todolistId, param.title);

            if (response.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));
                dispatch(changeTodolistEntityStatusAC({id: param.todolistId, entityStatus: 'succeeded'}));
                return {id: param.todolistId, title: param.title};
            } else {
                if (response.data.messages) {
                    dispatch(appSetErrorAC({error: response.data.messages[0]}));
                    dispatch(appSetStatusAC({status: 'failed'}));
                    dispatch(changeTodolistEntityStatusAC({id: param.todolistId, entityStatus: 'failed'}));
                    return {id: param.todolistId, entityStatus: 'failed'};
                } else {
                    return {error: 'Some Error'};
                }
            }
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    })

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        updateTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: AppInitialStateStatusType }>) {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus;
        }
    },
    extraReducers: builder =>
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            //const payload = action.payload as { todolists: TodolistDomainType[] }
            if (action.payload) {
                initialState = action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
            }
        })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(t => t.id === action.payload.todolistId);
                if (index > -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(t => t.id === action.payload.id);
                state[index].title = action.payload.title as string;
            })
})

export const todolistsReducer = slice.reducer;
export const {updateTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions;

// вариант thunk из react-redux
/*export const getTodolistsTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC({todolists: response.data}));
                dispatch(appSetStatusAC({status: 'succeeded'}));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const deleteTodolistTC = (todolistId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}));
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                dispatch(deleteTodolistAC({todolistId}))
                dispatch(appSetStatusAC({status: 'succeeded'}));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const createTodolistTC = (todolist: TodolistDomainType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        todolistsAPI.createTodolist(todolist.title)
            .then(response => {
                dispatch(createTodolistAC({todolist: response.data.data.item}))
                dispatch(appSetStatusAC({status: 'succeeded'}));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}));
        todolistsAPI.updateTodolist(todolistId, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTodolistTitleAC({id: todolistId, title}))
                    dispatch(appSetStatusAC({status: 'succeeded'}));
                    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'succeeded'}));
                } else {
                    if (response.data.messages) {
                        dispatch(appSetErrorAC({error: response.data.messages[0]}));
                        dispatch(appSetStatusAC({status: 'failed'}));
                        dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'failed'}));
                    } else {
                        dispatch(appSetErrorAC({error: 'Some Error'}));
                    }
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/

// react-redux
/*export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
    entityStatus: AppInitialStateStatusType
}

export let todolistId1 = v1();
export let todolistId2 = v1();*/

// иной метод типизации initialState
// type StateType = typeof initialState

// const initialState: Array<TodolistDomainType> = [
//     {id: todolistId1, title: 'Выучить', filter: 'all', addedDate: '', order: 0},
//     {id: todolistId2, title: 'Купить', filter: 'all', addedDate: '', order: 1}
// ]

// const initialState: Array<TodolistDomainType> = [];

/*export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistsActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'DELETE_TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'CREATE_NEW_TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...state];

            // return [{
            //     id: action.todolistId, title: action.title,
            //     filter: 'all' as FilterType, addedDate: '', order: 0
            // }, ...state];
        }
        case 'UPDATE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        }
        case 'UPDATE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        }
        case 'CHANGE_TODOLIST_ENTITY_STATUS': {
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus} : el);
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}*/

/*-----------------------------------------------------------------------------------*/

/*export type TodolistsActionTypes =
    CreateTodolistACType |
    DeleteTodolistACType |
    UpdateTodolistTitleACType |
    UpdateTodolistFilterACType |
    ChangeTodolistEntityStatusACType |
    SetTodolistsACType;

export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => ({
    type: 'DELETE_TODOLIST',
    id: todolistId
} as const)

export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (todolist: TodolistAPIType /!*title: string*!/) => ({
    type: 'CREATE_NEW_TODOLIST', todolist
    // title,
    // todolistId: v1()
} as const)

export type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (id: string, title: string) => ({
    type: 'UPDATE_TODOLIST_TITLE',
    id, title
} as const)

export type UpdateTodolistFilterACType = ReturnType<typeof updateTodolistFilterAC>
export const updateTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: 'UPDATE_TODOLIST_FILTER',
    id, filter
} as const)

export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string, entityStatus: AppInitialStateStatusType) => ({
    type: 'CHANGE_TODOLIST_ENTITY_STATUS',
    id, entityStatus
} as const)

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistAPIType>) => ({
    type: 'SET_TODOLISTS',
    todolists
} as const)*/

// не нужен
// export type IsLoadingACType = ReturnType<typeof isLoadingAC>
// export const isLoadingAC = (isLoading: boolean) => ({
//     type: 'IS_LOADING',
//     isLoading
// } as const)

/*-----------------------------------------------------------------------------------*/

// async await version getTodolistsTC
// export const getTodolistsTC = (): AppThunkType => async (dispatch) => {
//     try {
//         const response = await todolistsAPI.getTodolists();
//         dispatch(setTodolistsAC(response.data)); // response находится в переменной
//     }
//     catch(error) {
//         console.log(error)
//     }
// }

/*
export const getTodolistsTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response.data));
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}

export const deleteTodolistTC = (todolistId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'));
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                dispatch(deleteTodolistAC(todolistId))
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}

export const createTodolistTC = (todolist: TodolistDomainType /!*title: string*!/): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.createTodolist(todolist.title)
            .then(response => {
                //dispatch(createTodolistAC(todolist)) // !!! так лучше не делать
                dispatch(createTodolistAC(response.data.data.item))
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'));
        todolistsAPI.updateTodolist(todolistId, title)
            .then(response => {
                // handleServerAppError(response.data, dispatch);
                if (response.data.resultCode === 0) {
                    dispatch(updateTodolistTitleAC(todolistId, title))
                    dispatch(appSetStatusAC('succeeded'));
                    dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'));
                } else {
                    if (response.data.messages) {
                        dispatch(appSetErrorAC(response.data.messages[0]));
                        dispatch(appSetStatusAC('failed'));
                        dispatch(changeTodolistEntityStatusAC(todolistId,'failed'));
                    } else {
                        dispatch(appSetErrorAC('Some Error'));
                    }
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}*/
