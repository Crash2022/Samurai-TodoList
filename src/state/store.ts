import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer);
//export const store = createStore(rootReducer); // старая версия записи

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;