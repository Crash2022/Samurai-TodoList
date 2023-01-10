import {
    authAPI,
    FieldsErrorsType,
    LoginParamsType,
    TasksResponseType,
    todolistsAPI,
    TodolistsResponseType
} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from '../common/utils/errorUtils';
import {appSetStatusAC} from './app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunkType} from "./store";
import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getTasksTC_WorkerSaga, setTasksAC} from './tasks-reducer';

// redux-toolkit
/*export type LoginInitialStateType = {
    isLoggedIn: boolean
}

type loginRejectValue = {
    rejectValue: {
        errors: Array<string>
        fieldsErrors?: Array<FieldsErrorsType>
    }
}

export const loginTC = createAsyncThunk<undefined, LoginParamsType, loginRejectValue>
('login/login', async (data: LoginParamsType, {dispatch, rejectWithValue}) => {
    dispatch(appSetStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.login(data);

        if (response.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return;
        } else {
            handleServerAppError(response.data, dispatch);
            return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (err) {
        const error: any = err; // AxiosError
        handleServerNetworkError(error, dispatch);
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('login/logout',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.logout();

            if (response.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));
                return;
            } else {
                handleServerAppError(response.data, dispatch);
                return rejectWithValue({});
            }
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
            return rejectWithValue({});
        }
    })

const slice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false
    } as LoginInitialStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: builder =>
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true;
        })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false;
            })

})

export const loginReducer = slice.reducer;

// определение экшена через константу
// const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// определение экшена через деструктуризацию
export const {setIsLoggedInAC} = slice.actions;*/

// вариант thunk для RTK из react-redux
/*export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        authAPI.login(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({isLoggedIn: true}));
                    dispatch(appSetStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({isLoggedIn: false}));
                    dispatch(appSetStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(response.data, dispatch);
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
export type LoginInitialStateType = {
    isLoggedIn: boolean
}

const initialState: LoginInitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: LoginInitialStateType = initialState,
                             action: LoginActionTypes): LoginInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED_IN': {
            return {...state, isLoggedIn: action.isLoggedIn};
        }
        default:
            return state;
    }
}

/*-----------------------------------------------------------------------------------*/

// actions
export type LoginActionTypes = SetIsLoggedInACType;

export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET_IS_LOGGED_IN', isLoggedIn
} as const)

/*-----------------------------------------------------------------------------------*/

// thunks
/*export const loginTC = (data: LoginParamsType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        authAPI.login(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true));
                    dispatch(appSetStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const logoutTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false));
                    dispatch(appSetStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
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

export function* loginWatcherSaga() {
    yield takeEvery('LOGIN/LOGIN', loginTC_WorkerSaga)
    yield takeEvery('LOGIN/LOGOUT', logoutTC_WorkerSaga)
}

export const loginTC = (data: LoginParamsType) => ({type: 'LOGIN/LOGIN', data})
export function* loginTC_WorkerSaga(action: ReturnType<typeof loginTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(authAPI.login, action.data)
    try {
        if (response.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true));
            yield put(appSetStatusAC('succeeded'));
        } else {
            handleServerAppError(response.data);
        }
    } catch (error) {
        handleServerNetworkError(error as {message: string});
    }
}

export const logoutTC = () => ({type: 'LOGIN/LOGOUT'})
export function* logoutTC_WorkerSaga(action: ReturnType<typeof logoutTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(authAPI.logout)
    try {
        if (response.data.resultCode === 0) {
            yield put(setIsLoggedInAC(false));
            yield put(appSetStatusAC('succeeded'));
        } else {
            handleServerAppError(response.data);
        }
    } catch (error) {
        handleServerNetworkError(error as {message: string});
    }
}