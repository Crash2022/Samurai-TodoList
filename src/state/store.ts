import {combineReducers} from 'redux';
import {tasksReducer,} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app-reducer';
import {loginReducer} from './login-reducer';
import {configureStore} from '@reduxjs/toolkit';

/*------------------------------------------------------------*/

// hot reloading-replacement
/*if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}*/

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
export type AppRootStateType = ReturnType<typeof rootReducer> // рабочий вариант
// export type AppRootStateType = ReturnType<typeof store.getState> // типизация из документации

export type AppDispatch = typeof store.dispatch

// используется в утилите
// export type AsyncThunkType<RV = unknown> = {
//     state: AppRootStateType
//     dispatch: AppDispatch
//     rejectValue?: RV
//     serializedErrorType?: unknown
//     pendingMeta?: unknown
//     fulfilledMeta?: unknown
//     rejectedMeta?: unknown
//     extra?: unknown
//     // extra?: { s: string; n: number }
// }

/*------------------------------------------------------------*/

// @ts-ignore
window.store = store;