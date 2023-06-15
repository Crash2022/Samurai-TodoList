import {authAPI, FieldsErrorsType, LoginParamsType,} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError,} from '../common/utils/errorUtils';
import {appSetStatusAC} from './app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

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
const loginTC = createAsyncThunk<undefined, LoginParamsType, loginRejectValue>
('login/login', async (data, {dispatch, rejectWithValue}) => {
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

const logoutTC = createAsyncThunk('login/logout',
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
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true;
        })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false;
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