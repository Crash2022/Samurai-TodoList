import {appSetErrorAC, appSetStatusAC} from "../state/app-reducer";
import {TodolistsResponseType} from "../api/todolistsAPI";
// import {AppDispatch} from "../state/store";
import {ThunkDispatch} from "@reduxjs/toolkit";

// redux-toolkit
export const handleServerAppError = <D>(data: TodolistsResponseType<D>, dispatch: ThunkDispatch<any, any, any>) => {
    if (data.messages) {
        dispatch(appSetErrorAC({error: data.messages[0]}));
    } else {
        dispatch(appSetErrorAC({error: 'Some Error'}));
    }
    dispatch(appSetStatusAC({status: 'failed'}));
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ThunkDispatch<any, any, any>) => {
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
