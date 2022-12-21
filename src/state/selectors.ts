import {AppRootStateType} from "./store";

export const selectTodolists = (state: AppRootStateType) => state.todolists

export const selectTasksObj = (state: AppRootStateType) => state.tasks

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectAppError = (state: AppRootStateType) => state.app.error

export const selectAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn