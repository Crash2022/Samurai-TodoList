import {appSetErrorAC, appSetStatusAC} from '../../state/app-reducer';
import {TodolistsResponseType} from '../../api/todolistsAPI';
import {Dispatch} from '@reduxjs/toolkit';
import axios, {AxiosError} from "axios";

// redux-toolkit
export const handleServerAppError = <D>(data: TodolistsResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
    // if (showError) {
        dispatch(appSetErrorAC({error: data.messages.length ? data.messages[0] : 'Some Error Occurred'}));
    // }

    // if (data.messages) {
    //     dispatch(appSetErrorAC({error: data.messages[0]}));
    // } else {
    //     dispatch(appSetErrorAC({error: 'Some Error'}));
    // }
    dispatch(appSetStatusAC({status: 'failed'}));
}

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred';
        dispatch(appSetErrorAC({error}));
    } else {
        dispatch(appSetErrorAC({error: `Native error ${err.message}`}));
    }
    dispatch(appSetStatusAC({status: 'failed'}));
}