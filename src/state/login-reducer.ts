import {authAPI, LoginParamsType, TodolistsResponseType} from '../api/todolistsAPI';
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from '../common/utils/errorUtils';
import {appSetStatusAC} from './app-reducer';
import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosError, AxiosResponse} from 'axios';

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

// actions
export type LoginActionTypes = SetIsLoggedInACType;

export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET_IS_LOGGED_IN', isLoggedIn
} as const)

// react-redux-saga
export function* loginWatcherSaga() {
    yield takeEvery('LOGIN/LOGIN', loginTC_WorkerSaga)
    yield takeEvery('LOGIN/LOGOUT', logoutTC_WorkerSaga)
}

export const loginTC = (data: LoginParamsType) => ({type: 'LOGIN/LOGIN', data} as const)
export function* loginTC_WorkerSaga(action: ReturnType<typeof loginTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(authAPI.login, action.data)
    try {
        if (response.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true));
            yield put(appSetStatusAC('succeeded'));
        } else {
            yield* handleServerAppErrorSaga(response.data);
        }
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const logoutTC = () => ({type: 'LOGIN/LOGOUT'} as const)
export function* logoutTC_WorkerSaga(action: ReturnType<typeof logoutTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(authAPI.logout)
    try {
        if (response.data.resultCode === 0) {
            yield put(setIsLoggedInAC(false));
            yield put(appSetStatusAC('succeeded'));
        } else {
            yield* handleServerAppErrorSaga(response.data);
        }
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}