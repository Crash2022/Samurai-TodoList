import {authAPI, MeResponseType} from '../api/todolistsAPI';
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from '../common/utils/errorUtils';
import {setIsLoggedInAC} from './login-reducer';
import {put, call, takeEvery} from 'redux-saga/effects'
import {AxiosError, AxiosResponse} from 'axios';

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

export const initializeAppTC = () => ({type: 'APP/INITIALIZE_APP'} as const)
export function* initializeAppTC_WorkerSaga(): any {
    const response: AxiosResponse<MeResponseType> = yield call(authAPI.authMe)
        try {
            if (response.data.resultCode === 0) {
                yield put(setIsLoggedInAC(true));
            } else {
                yield* handleServerAppErrorSaga(response.data);
            }
            yield put(appSetInitializedAC(true));
        }
        catch(error) {
            yield* handleServerNetworkErrorSaga(error as AxiosError);
        }
}