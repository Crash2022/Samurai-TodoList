import {authAPI, TodolistAPIType, todolistsAPI, TodolistsResponseType} from '../api/todolistsAPI';
import {AppInitialStateStatusType, appSetErrorAC, appSetStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../common/utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunkType} from "./store";
import {call, put, takeEvery} from 'redux-saga/effects';
import {loginTC_WorkerSaga, logoutTC_WorkerSaga, setIsLoggedInAC} from './login-reducer';
import {AxiosResponse} from 'axios';

// redux-toolkit
/*export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
    entityStatus: AppInitialStateStatusType
}

let initialState: Array<TodolistDomainType> = [];

export const getTodolistsTC = createAsyncThunk('todolists/getTodolists',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));

        try {
            const response = await todolistsAPI.getTodolists();
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {todolists: response.data};
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
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
            // dispatch(appSetStatusAC({status: 'succeeded'}));
            // return {todolist: response.data.data.item};

            if (response.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));
                return {todolist: response.data.data.item};
            } else {
                handleServerAppError(response.data, dispatch);
                return rejectWithValue(null);
            }
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
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
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
export const {updateTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions;*/

// вариант thunk для RTK из react-redux
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
}

export const deleteTodolistTC = (todolistId: string): AppThunkType => {
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
}

export const createTodolistTC = (todolist: TodolistDomainType): AppThunkType => {
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
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkType => {
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

// reducer
export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
    entityStatus: AppInitialStateStatusType
}

/*export let todolistId1 = v1();
export let todolistId2 = v1();

иной метод типизации initialState
type StateType = typeof initialState

const initialState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'Выучить', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'Купить', filter: 'all', addedDate: '', order: 1}
]*/

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
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
}

/*-----------------------------------------------------------------------------------*/

// actions
export type TodolistsActionTypes =
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
export const createTodolistAC = (todolist: TodolistAPIType /*title: string*/) => ({
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
} as const)

/*-----------------------------------------------------------------------------------*/

// thunks
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

/*export const getTodolistsTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response.data));
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const deleteTodolistTC = (todolistId: string): AppThunkType => {
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
            })
    }
}*/

/*export const createTodolistTC = (todolist: TodolistDomainType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.createTodolist(todolist.title)
            .then(response => {
                dispatch(createTodolistAC(response.data.data.item))
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'));
        todolistsAPI.updateTodolist(todolistId, title)
            .then(response => {
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
            })
    }
}*/

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/

// react-redux-saga

export function* todolistsWatcherSaga() {
    yield takeEvery('TODOLISTS/GET_TODOLISTS', getTodolistsTC_WorkerSaga)
    yield takeEvery('TODOLISTS/DELETE_TODOLIST', deleteTodolistTC_WorkerSaga)
    yield takeEvery('TODOLISTS/CREATE_TODOLIST', createTodolistTC_WorkerSaga)
    yield takeEvery('TODOLISTS/UPDATE_TODOLIST_TITLE', updateTodolistTitleTC_WorkerSaga)
}

export const getTodolistsTC = () => ({type: 'TODOLISTS/GET_TODOLISTS'})
export function* getTodolistsTC_WorkerSaga(action: ReturnType<typeof getTodolistsTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<Array<TodolistAPIType>> = yield call(todolistsAPI.getTodolists)
    try {
        yield put(setTodolistsAC(response.data));
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        handleServerNetworkError(error as {message: string});
    }
}

export const deleteTodolistTC = (todolistId: string) => ({type: 'TODOLISTS/DELETE_TODOLIST', todolistId})
export function* deleteTodolistTC_WorkerSaga(action: ReturnType<typeof deleteTodolistTC>): any {
    yield put(appSetStatusAC('loading'));
    yield put(changeTodolistEntityStatusAC(action.todolistId,'loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(todolistsAPI.deleteTodolist, action.todolistId)
    try {
        yield put(deleteTodolistAC(action.todolistId))
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        handleServerNetworkError(error as {message: string});
    }
}

export const createTodolistTC = (todolist: TodolistDomainType) => ({type: 'TODOLISTS/CREATE_TODOLIST', todolist})
export function* createTodolistTC_WorkerSaga(action: ReturnType<typeof createTodolistTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: any = yield call(todolistsAPI.createTodolist, action.todolist.title)
    try {
        yield put(createTodolistAC(response.data.data.item))
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        handleServerNetworkError(error as {message: string});
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => ({type: 'TODOLISTS/UPDATE_TODOLIST_TITLE', todolistId, title})
export function* updateTodolistTitleTC_WorkerSaga(action: ReturnType<typeof updateTodolistTitleTC>): any {
    yield put(appSetStatusAC('loading'));
    yield put(changeTodolistEntityStatusAC(action.todolistId,'loading'));
    const response: any = yield call(todolistsAPI.updateTodolist, action.todolistId, action.title)
    try {
        if (response.data.resultCode === 0) {
            yield put(updateTodolistTitleAC(action.todolistId, action.title))
            yield put(appSetStatusAC('succeeded'));
            yield put(changeTodolistEntityStatusAC(action.todolistId,'succeeded'));
        } else {
            if (response.data.messages) {
                yield put(appSetErrorAC(response.data.messages[0]));
                yield put(appSetStatusAC('failed'));
                yield put(changeTodolistEntityStatusAC(action.todolistId,'failed'));
            } else {
                yield put(appSetErrorAC('Some Error'));
            }
        }
    } catch (error) {
        handleServerNetworkError(error as {message: string});
    }
}