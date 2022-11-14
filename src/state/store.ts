import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {TaskActionTypes, tasksReducer} from "./tasks-reducer";
import {TodolistActionTypes, todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

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
    tasks: tasksReducer
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>;
// export type AppRootStateType = ReturnType<typeof store.getState>; // другая запись типизации

// типизация Dispatch и Selector
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;
// export type TypedDispatch = typeof store.dispatch; // другая запись типизации
type AppActionType = TodolistActionTypes | TaskActionTypes // здесь все типы Action Creator

// типизация Thunk
export type TypedTHunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// @ts-ignore
window.store = store;