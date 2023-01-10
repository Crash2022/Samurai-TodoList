import {AppRootStateType} from "./store";
import { select } from 'redux-saga/effects'

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectAppError = (state: AppRootStateType) => state.app.error

export const selectAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

export const selectTodolists = (state: AppRootStateType) => state.todolists

export const selectTasksObj = (state: AppRootStateType) => state.tasks

// selector for saga
export function* appSelect<TSelected>(selector: (state: AppRootStateType) => TSelected, ): Generator<any, TSelected, TSelected> {
        return yield select(selector);
}