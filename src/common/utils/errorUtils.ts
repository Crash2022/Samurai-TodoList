import {appSetErrorAC, appSetStatusAC} from '../../state/app-reducer';
import {TodolistsResponseType} from '../../api/todolistsAPI';
import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';
import {AppDispatch, AppRootStateType} from '../../state/store';
import {put} from 'redux-saga/effects'

// redux-toolkit
/*export const handleServerAppError = <D>(data: TodolistsResponseType<D>, dispatch: Dispatch) => {
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
}*/


// react-redux
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

// react-redux-saga
export function* handleServerAppErrorSaga<D>(data: TodolistsResponseType<D>) {
    if (data.messages) {
        yield put(appSetErrorAC(data.messages[0]));
    } else {
        yield put(appSetErrorAC('Some error occurred'));
    }
    yield put(appSetStatusAC('failed'));
}

export function* handleServerNetworkErrorSaga(error: { message: string }) {
    yield put(
        appSetErrorAC(error.message ? error.message : 'Some error occurred')
    );
    yield put(appSetStatusAC('failed'));
}
