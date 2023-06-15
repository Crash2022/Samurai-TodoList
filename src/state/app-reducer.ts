import {authAPI} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError,} from '../common/utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from './login-reducer';
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";

// redux-toolkit
export type AppInitialStateType = {
    status: AppInitialStateStatusType // происходит ли сейчас взаимодействие с сервером
    error: string | null // текст ошибки
    isInitialized: boolean
}

export type AppInitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

// thunks
const initializeAppTC = createAsyncThunk /*createAppAsyncThunk<{isInitialized: boolean}, void>*/('app/initializeApp',
    async (arg, {dispatch}) => {
        dispatch(appSetStatusAC({status: 'loading'}));

        try {
            const response = await authAPI.authMe();

            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                dispatch(appSetStatusAC({status: 'succeeded'}));
                return { } // NEED TO FIX (for test)?
            } else {
                handleServerAppError(response.data, dispatch);
            }
        } catch (err) {
            const error: any = err; // AxiosError
            handleServerNetworkError(error, dispatch);
        }
    })

// slice
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
        },
        // initializeAppAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
        //     state.isInitialized = action.payload.isInitialized;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        })
    }
})

export const appReducer = slice.reducer
export const {appSetStatusAC, appSetErrorAC} = slice.actions
// export const appActions = slice.actions // экспорт без деструктуризации
export const appThunks = {initializeAppTC}

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