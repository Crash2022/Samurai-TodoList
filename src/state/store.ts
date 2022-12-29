import {combineReducers, compose} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {loginReducer} from './login-reducer';
import {configureStore} from '@reduxjs/toolkit';

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
// @ts-ignore // для Chrome Extension
// export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// redux-toolkit store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>;
// export type AppRootStateType = ReturnType<typeof store.getState> // типизация из документации

// типизация Dispatch и Selector (useHooks)
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// react-redux
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, any>;
// redux-toolkit
export type AppDispatch = typeof store.dispatch;


// типизация всех экшенов для React-Redux
// export type AppActionType =
//     TodolistsActionTypes |
//     TasksActionTypes |
//     ApplicationActionTypes |
//     LoginActionTypes;

// типизация Thunk
// react-redux
// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
// redux-toolkit
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>

// @ts-ignore
window.store = store;