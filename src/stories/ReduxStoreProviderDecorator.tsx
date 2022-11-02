import React from 'react';
import {AppRootStateType} from "../state/store";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialStorybookState = {
    todolists: [
        {id: 'todolistId1', title: 'Выучить', filter: 'all'},
        {id: 'todolistId2', title: 'Купить', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "React Native", isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: "Notebook", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Bike", isDone: false},
            {id: v1(), title: "Mango", isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer,
    initialStorybookState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
}