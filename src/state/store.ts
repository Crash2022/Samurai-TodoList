import {combineReducers, compose} from 'redux';
import {tasksReducer,} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {loginReducer} from './login-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers'

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
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: loginReducer
})

// redux-toolkit store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>; // рабочий вариант
// export type AppRootStateType = ReturnType<typeof store.getState> // типизация из документации

export type AppDispatch = typeof store.dispatch;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>

/*------------------------------------------------------------*/

// @ts-ignore
window.store = store;