import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {TasksActionTypes, tasksReducer} from './tasks-reducer';
import {TodolistsActionTypes, todolistsReducer} from './todolists-reducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ApplicationActionTypes, appReducer, initializeAppTC_WorkerSaga} from './app-reducer';
import {LoginActionTypes, loginReducer} from './login-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers'
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'

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
// REDUX TOOLKIT

// rootReducer без Hot Reloading
// const rootReducer = combineReducers({
//     todolists: todolistsReducer,
//     tasks: tasksReducer,
//     app: appReducer,
//     auth: loginReducer
// })

// redux-toolkit store
/*export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>; // рабочий вариант
// export type AppRootStateType = ReturnType<typeof store.getState> // типизация из документации

export type AppDispatch = typeof store.dispatch;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>*/

/*------------------------------------------------------------*/
// REACT REDUX

// rootReducer без Hot Reloading
// const rootReducer = combineReducers({
//     todolists: todolistsReducer,
//     tasks: tasksReducer,
//     app: appReducer,
//     auth: loginReducer
// })

// react-redux store
// @ts-ignore // для Chrome Extension
/*export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

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
    LoginActionTypes;*/

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
    yield takeEvery('APP/INITIALIZE_APP', initializeAppTC_WorkerSaga)
}

// function* rootWorker() {
//
// }

/*------------------------------------------------------------*/

// @ts-ignore
window.store = store;