import {authAPI, FieldsErrorsType, LoginParamsType} from "../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {appSetStatusAC} from "./app-reducer";
import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

// redux-toolkit
export type LoginStateType = {
    isLoggedIn: boolean
}

// const initialState: LoginStateType = {
//     isLoggedIn: false
// }

type loginRejectValue = {
    rejectValue: {
        errors: Array<string>
        fieldsErrors?: Array<FieldsErrorsType>
    }
}

export const loginTC = createAsyncThunk<undefined, LoginParamsType, loginRejectValue>
    ('login/login', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}));
    try {
        const response = await authAPI.login(data);

        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}));
            return;
        } else {
            handleServerAppError(response.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (err) {
        const error: any = err; // AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('login/logout',
    async (param, thunkAPI) => {
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}));
    try {
        const response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}));
            return;
        } else {
            handleServerAppError(response.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({});
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({});
    }
})

const slice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false
    } as LoginStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true;
        });
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
    }
})

export const loginReducer = slice.reducer;

// определение экшена через константу
// const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// определение экшена через деструктуризацию
export const {setIsLoggedInAC} = slice.actions;

// вариант thunk из react-redux
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
}*/

/*export const logoutTC = () => {
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
/*export type LoginActionTypes = SetIsLoggedInACType;

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
}*/

/*-----------------------------------------------------------------------------------*/

// export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
// export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
//     type: 'LOGIN/SET_IS_LOGGED_IN', isLoggedIn
// } as const)

/*-----------------------------------------------------------------------------------*/

// export const loginTC = (data: LoginParamsType): AppThunkType => {
//     return (dispatch) => {
//         dispatch(appSetStatusAC('loading'));
//         authAPI.login(data)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(setIsLoggedInAC(true));
//                     dispatch(appSetStatusAC('succeeded'));
//                 } else {
//                     handleServerAppError(response.data, dispatch);
//                     // if (response.data.messages) {
//                     //     dispatch(appSetErrorAC(response.data.messages[0]));
//                     // } else {
//                     //     dispatch(appSetErrorAC('Some Error'));
//                     // }
//                 }
//             })
//             .catch(error => {
//                 handleServerNetworkError(error, dispatch);
//                 // dispatch(appSetErrorAC(error.message));
//                 // dispatch(appSetStatusAC('failed'));
//             })
//     }
// }
//
// export const logoutTC = (): AppThunkType => {
//     return (dispatch) => {
//         dispatch(appSetStatusAC('loading'));
//         authAPI.logout()
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(setIsLoggedInAC(false));
//                     dispatch(appSetStatusAC('succeeded'));
//                 } else {
//                     handleServerAppError(response.data, dispatch);
//                     // if (response.data.messages) {
//                     //     dispatch(appSetErrorAC(response.data.messages[0]));
//                     // } else {
//                     //     dispatch(appSetErrorAC('Some Error'));
//                     // }
//                 }
//             })
//             .catch(error => {
//                 handleServerNetworkError(error, dispatch);
//                 // dispatch(appSetErrorAC(error.message));
//                 // dispatch(appSetStatusAC('failed'));
//             })
//     }
// }