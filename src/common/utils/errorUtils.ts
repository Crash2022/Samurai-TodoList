import {appSetErrorAC, appSetStatusAC} from '../../state/app-reducer';
import {TodolistsResponseType} from '../../api/todolistsAPI';
import {Dispatch} from '@reduxjs/toolkit';

// redux-toolkit
export const handleServerAppError = <D>(data: TodolistsResponseType<D>, dispatch: Dispatch) => {
    if (data.messages) {
        dispatch(appSetErrorAC({error: data.messages[0]}));
    } else {
        dispatch(appSetErrorAC({error: 'Some Error'}));
    }
    dispatch(appSetStatusAC({status: 'failed'}));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appSetErrorAC({error: error.message ? error.message : 'Some Error Occurred'}));
    dispatch(appSetStatusAC({status: 'failed'}));
}