import {appSetErrorAC, appSetStatusAC} from '../../state/app-reducer';
import {TodolistsResponseType} from '../../api/todolistsAPI';
// import {AppDispatch} from "../state/store";
import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';
import {AppRootStateType} from '../../state/store';

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


// react-redux
/*
export const handleServerAppError = <D>(data: TodolistsResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages) {
        dispatch(appSetErrorAC({error: data.messages[0]}));
    } else {
        dispatch(appSetErrorAC({error: 'Some Error'}));
    }
    dispatch(appSetStatusAC({status: 'failed'}));
}

export const handleServerNetworkError = (error: {message: string}, dispatch: AppDispatch) => {
    dispatch(appSetErrorAC({error: error.message ? error.message : 'Some Error Occurred'}));
    dispatch(appSetStatusAC({status: 'failed'}));
}*/
