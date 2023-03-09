import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {
    TasksActionTypes,
    tasksReducer,
    tasksWatcherSaga
} from './tasks-reducer';
import {TodolistsActionTypes, todolistsReducer, todolistsWatcherSaga} from './todolists-reducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ApplicationActionTypes, appReducer, appWatcherSaga} from './app-reducer';
import {LoginActionTypes, loginReducer, loginWatcherSaga} from './login-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';

/*------------------------------------------------------------*/

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

/*------------------------------------------------------------*/

// hot reloading-replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}

/*------------------------------------------------------------*/

// REACT REDUX-SAGA

const sagaMiddleware = createSagaMiddleware()

// react-redux-saga store
// @ts-ignore // для Chrome Extension
export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>; // рабочий вариант
// export type AppRootStateType = ReturnType<typeof store.getState> // типизация из документации

// типизация Dispatch React-Redux
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, any>;

// типизация Thunk React-Redux
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// типизация всех экшенов для React-Redux
export type AppActionType =
    TodolistsActionTypes |
    TasksActionTypes |
    ApplicationActionTypes |
    LoginActionTypes;

// saga
sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([
        appWatcherSaga(),
        loginWatcherSaga(),
        todolistsWatcherSaga(),
        tasksWatcherSaga()
    ])

}

// function* rootWorker() {
//
// }

/*------------------------------------------------------------*/

// @ts-ignore
window.store = store;