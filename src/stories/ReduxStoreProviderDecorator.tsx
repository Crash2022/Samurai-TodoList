import React from 'react';
import {AppRootStateType} from "../state/store";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistId1, todolistId2, todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";
import {appReducer} from "../state/app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

const initialStorybookState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'Выучить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'Купить', filter: 'all', entityStatus: 'loading', addedDate: '', order: 1}
    ],
    tasks: {
        ['todolistId1']: [
            {todoListId: 'todolistId1', id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0},
            {todoListId: 'todolistId1', id: v1(), title: 'React',
                status: TaskStatuses.New, priority: TaskPriorities.Hi,
                description: '', addedDate: '', startDate: '', deadline: '', order: 1}
        ],
        ['todolistId2']: [
            {todoListId: 'todolistId2', id: v1(), title: 'Notebook',
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0},
            {todoListId: 'todolistId2', id: v1(), title: 'New Bike',
                status: TaskStatuses.Completed, priority: TaskPriorities.Later,
                description: '', addedDate: '', startDate: '', deadline: '', order: 1}
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialStorybookState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
}