import {combineReducers} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {appReducer} from './app-reducer';
import {loginReducer} from './login-reducer';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: loginReducer
})