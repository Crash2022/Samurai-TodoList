import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {TasksActionTypes, tasksReducer} from "./tasks-reducer";
import {TodolistsActionTypes, todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ApplicationActionTypes, appReducer} from "./app-reducer";
import {LoginActionTypes, loginReducer} from "./login-reducer";
import {configureStore} from "@reduxjs/toolkit";

// для React Redux DevTools Chrome
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// для React Redux DevTools Chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// добавляем composeEnhancers() для React Redux DevTools Chrome
// export const store = createStore(rootReducer, composeEnhancers());


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: loginReducer
})

// react-redux store
// @ts-ignore
// export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// redux-toolkit store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>;
// export type AppRootStateType = ReturnType<typeof store.getState>; // другая запись типизации

// типизация Dispatch и Selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>;
// export type AppDispatch = typeof store.dispatch; // другая запись типизации (из доки), работает не всегда

// типизация всех экшенов
export type AppActionType =
    TodolistsActionTypes |
    TasksActionTypes |
    ApplicationActionTypes |
    LoginActionTypes;

// типизация Thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// @ts-ignore
window.store = store;