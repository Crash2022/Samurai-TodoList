import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {TaskActionTypes, tasksReducer} from "./tasks-reducer";
import {TodolistActionTypes, todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";

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
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware)/*, composeEnhancers()*/);
//export const store = createStore(rootReducer); // старая версия записи

export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
type AppActionType = TodolistActionTypes | TaskActionTypes // здесь все типы Action Creator
type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

// @ts-ignore
window.store = store;