import {AppThunkType} from "./store";
import {authAPI, LoginParamsType, todolistsAPI} from "../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {appSetStatusAC} from "./app-reducer";
import {createTaskAC} from "./tasks-reducer";

export type LoginInitialStateType = {
    auth: boolean
}

export type LoginActionTypes = LoginMeACType;

const initialState: LoginInitialStateType = {
    auth: false
}

export const loginReducer = (state: LoginInitialStateType = initialState,
                                 action: LoginActionTypes): LoginInitialStateType => {
    switch (action.type) {
        case 'LOGIN_ME': {
            return {...state};
        }
        default:
            return {...state};
    }
}

/*-----------------------------------------------------------------------------------*/

export type LoginMeACType = ReturnType<typeof loginMeAC>
export const loginMeAC = () => ({
    type: 'LOGIN_ME'
} as const)

/*-----------------------------------------------------------------------------------*/

export const loginMeTC = (data: LoginParamsType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        authAPI.loginMe(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    alert('login')
                    // dispatch(loginMeAC(response.data.data.userId));
                    // dispatch(appSetStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                    // if (response.data.messages) {
                    //     dispatch(appSetErrorAC(response.data.messages[0]));
                    // } else {
                    //     dispatch(appSetErrorAC('Some Error'));
                    // }
                }
                //dispatch(setTasksAC(todolistId, response.data.items));
                //dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);

                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}