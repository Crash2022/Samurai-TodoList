import {appSetErrorAC, appSetStatusAC} from "../state/app-reducer";
import {TodolistsResponseType} from "../api/todolistsAPI";
import {AppDispatch} from "../state/store";

export const handleServerAppError = <D>(data: TodolistsResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages) {
        dispatch(appSetErrorAC(data.messages[0]));
    } else {
        dispatch(appSetErrorAC('Some Error'));
    }
    dispatch(appSetStatusAC('failed'));
}

export const handleServerNetworkError = (error: {message: string}, dispatch: AppDispatch) => {
    dispatch(appSetErrorAC(error.message ? error.message : 'Some Error Occurred'));
    dispatch(appSetStatusAC('failed'));
}