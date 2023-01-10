import {authAPI} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from '../common/utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from './login-reducer';
import {AppThunkType} from "./store";
import {put, call, takeEvery} from 'redux-saga/effects'

// redux-toolkit
/*export type AppInitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: AppInitialStateStatusType
    // текст ошибки запишем сюда
    error: string | null
    isInitialized: boolean
}

export type AppInitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initializeAppTC = createAsyncThunk('app/initializeApp',
    async (param, {dispatch}) => {
        dispatch(appSetStatusAC({status: 'loading'}));

        try {
            const response = await authAPI.authMe();

            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                dispatch(appSetStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(response.data, dispatch);
            }
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
        }
    })

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as AppInitialStateType,
    reducers: {
        appSetStatusAC(state, action: PayloadAction<{ status: AppInitialStateStatusType }>) {
            state.status = action.payload.status;
        },
        appSetErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        })
    }
})

export const appReducer = slice.reducer;
export const {appSetStatusAC, appSetErrorAC} = slice.actions;*/

// вариант thunk для RTK из react-redux
/*export const initializeAppTC = (): AppThunkType => {
    // типизация Dispatch для Redux-Toolkit, для React-Redux другая
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({isLoggedIn: true}));
                    dispatch(appSetStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
                dispatch(appSetInitializedAC({isInitialized: true}));
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
export type AppInitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: AppInitialStateStatusType
    // текст ошибки запишем сюда
    error: string | null
    isInitialized: boolean
}
export type AppInitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppInitialStateType = {
    status: 'idle', // idle - начальное значение (простаивание)
    error: null,
    isInitialized: false
}

export const appReducer = (state: AppInitialStateType = initialState,
                                 action: ApplicationActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS': {
            return {...state, status: action.status};
        }
        case 'APP/SET_ERROR': {
            return {...state, error: action.error};
        }
        case 'APP/SET_INITIALIZED': {
            return {...state, isInitialized: action.isInitialized};
        }
        default:
            return {...state};
    }
}

/*-----------------------------------------------------------------------------------*/

// actions
export type ApplicationActionTypes =
    AppSetStatusACType |
    AppSetErrorACType |
    AppSetInitializedACType;

export type AppSetStatusACType = ReturnType<typeof appSetStatusAC>
export const appSetStatusAC = (status: AppInitialStateStatusType) => ({
    type: 'APP/SET_STATUS', status
} as const)

export type AppSetErrorACType = ReturnType<typeof appSetErrorAC>
export const appSetErrorAC = (error: string | null) => ({
    type: 'APP/SET_ERROR', error
} as const)

export type AppSetInitializedACType = ReturnType<typeof appSetInitializedAC>
export const appSetInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET_INITIALIZED', isInitialized
} as const)

/*-----------------------------------------------------------------------------------*/

// thunks
/*export const initializeAppTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true));
                    dispatch(appSetStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                    // if (response.data.messages) {
                    //     dispatch(appSetErrorAC(response.data.messages[0]));
                    // } else {
                    //     dispatch(appSetErrorAC('Some Error'));
                    // }
                }
                dispatch(appSetInitializedAC(true));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}*/

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
// react-redux-saga

// типизация генератора
/*
type WhatYouYield="foo"
type WhatYouReturn="bar"
type WhatYouAccept="baz"

function* myFun(): Generator<WhatYouYield, WhatYouReturn, WhatYouAccept> {
    const myYield = "foo" // type of myYield is WhatYouYield
    const myAccepted = yield myYield; // type of myAccepted is WhatYouAccept
    return "baz" // type of this value is WhatYouReturn
}*/

export function* appWatcherSaga() {
    yield takeEvery('APP/INITIALIZE_APP', initializeAppTC_WorkerSaga)
}

export const initializeAppTC = () => ({type: 'APP/INITIALIZE_APP'})
export function* initializeAppTC_WorkerSaga(): any {
    yield put(appSetStatusAC('loading'));
    const response = yield call(authAPI.authMe)
        try {
            if (response.data.resultCode === 0) {
                yield put(setIsLoggedInAC(true));
                yield put(appSetStatusAC('succeeded'));
            } else {
                // handleServerAppError(response.data);
                if (response.data.messages) {
                    yield put(appSetErrorAC(response.data.messages[0]));
                } else {
                    yield put(appSetErrorAC('Some Error'));
                }
            }
            yield put(appSetInitializedAC(true));
            yield put(appSetStatusAC('succeeded'));
        }
        catch(error) {
            // handleServerNetworkError(error as {message: string});
            // @ts-ignore
            yield put(appSetErrorAC(error.message));
            yield put(appSetStatusAC('failed'));
        }
}
