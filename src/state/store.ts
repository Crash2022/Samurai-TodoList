import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

// для React Redux Tools Chrome
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer);
//export const store = createStore(rootReducer); // старая версия записи

export type AppRootStateType = ReturnType<typeof rootReducer>;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// // непосредственно создаём store
// export const store = createStore(rootReducer, composeEnhancers());


// @ts-ignore
window.store = store;