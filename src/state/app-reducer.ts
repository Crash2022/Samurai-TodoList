import {authAPI} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from '../common/utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from './login-reducer';
import {AppThunkType} from "./store";

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

// вариант thunk из react-redux
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
export type ApplicationActionTypes =
    AppSetStatusACType |
    AppSetErrorACType |
    AppSetInitializedACType;

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
export const initializeAppTC = (): AppThunkType => {
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
}