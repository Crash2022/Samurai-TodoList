import {combineReducers, compose, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

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

export const store = legacy_createStore(rootReducer, composeEnhancers());
//export const store = createStore(rootReducer); // старая версия записи

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;