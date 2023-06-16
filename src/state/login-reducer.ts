import {authAPI, FieldsErrorsType, LoginParamsType,} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError,} from '../common/utils/error-utils';
import {appSetStatusAC} from './app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";

// redux-toolkit
export type LoginInitialStateType = {
    isLoggedIn: boolean
}

type loginRejectValue = {
    rejectValue: {
        errors: Array<string>
        fieldsErrors?: Array<FieldsErrorsType>
    }
}

// thunks
const loginTC = /*createAppAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>*/ createAsyncThunk<undefined, LoginParamsType, loginRejectValue>
('login/login', async (arg, {dispatch, rejectWithValue}) => {
    dispatch(appSetStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.login(arg);

        if (response.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            // return {isLoggedIn: true};
            return;
        } else {
            handleServerAppError(response.data, dispatch, false);
            // return rejectWithValue(null)
            return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (err) {
        const error: any = err; // AxiosError
        handleServerNetworkError(err, dispatch);
        // return rejectWithValue(null)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

const logoutTC = createAsyncThunk /*createAppAsyncThunk<{isLoggedIn: boolean}, void>*/('login/logout',
    async (arg, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.logout();

            if (response.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));
                return {isLoggedIn: false};
                // return;
            } else {
                handleServerAppError(response.data, dispatch);
                return rejectWithValue(null);
                // return rejectWithValue({});
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue(null);
            // return rejectWithValue({});
        }
    })

// slice
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
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                // state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logoutTC.fulfilled, (state, action) => {
                // state.isLoggedIn = false;
                state.isLoggedIn = action.payload.isLoggedIn;
            })
})

export const loginReducer = slice.reducer
export const loginThunks = {loginTC, logoutTC}

// определение экшена через константу
// const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// определение экшена через деструктуризацию
export const {setIsLoggedInAC} = slice.actions;

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