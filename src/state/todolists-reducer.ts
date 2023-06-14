import {TodolistAPIType, todolistsAPI} from '../api/todolistsAPI';
import {AppInitialStateStatusType, appSetErrorAC, appSetStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../common/utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

// redux-toolkit
export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
    entityStatus: AppInitialStateStatusType
}

let initialState: Array<TodolistDomainType> = [];

const getTodolistsTC = createAsyncThunk('todolists/getTodolists',
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

const deleteTodolistTC = createAsyncThunk('todolists/deleteTodolist',
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

const createTodolistTC = createAsyncThunk('todolists/createTodolist',
    async (todolist: TodolistDomainType, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));

        try {
            const response = await todolistsAPI.createTodolist(todolist.title);

            if (response.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));

                // @ts-ignore
                return {todolist: response.data.data.item}; // NEED TO FIX!
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

const updateTodolistTitleTC = createAsyncThunk('todolists/updateTodolist',
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

export const todolistsReducer = slice.reducer
export const {updateTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions
// export const todolistsActions = slice.actions // экспорт без деструктуризации
export const todolistsThunks = {getTodolistsTC, createTodolistTC, deleteTodolistTC, updateTodolistTitleTC}

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