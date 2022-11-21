import {AppThunkType} from "./store";
import {authAPI, LoginParamsType} from "../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {appSetStatusAC} from "./app-reducer";

export type LoginActionTypes = SetIsLoggedInACType;

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

export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET_IS_LOGGED_IN', isLoggedIn
} as const)

/*-----------------------------------------------------------------------------------*/

export const loginMeTC = (data: LoginParamsType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        authAPI.loginMe(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // alert('login')
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
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}