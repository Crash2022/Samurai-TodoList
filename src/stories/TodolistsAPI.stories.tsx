import React, {useEffect, useState} from 'react';
import {todolistsAPI} from "../api/todolistsAPI";
//import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolists API Story',
    //component: TodolistsAPI,
    //decorators: [ReduxStoreProviderDecorator]
} //as ComponentMeta<typeof TodolistsAPI>;

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '74a19bbb-094d-4af5-81dc-fc82431ac8a3'
    }
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect( ()=> {
        todolistsAPI.getTodolists()
            .then(response => setState(response.data))
    }, [])

    return (
            <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const title = 'NEW todolist';

    useEffect( ()=> {
        todolistsAPI.createTodolist(title)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '3f28d2b3-3d31-465f-896e-0721bbb507f3';

    useEffect( ()=> {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const newTitle = 'UPDATED todolist title'
    const todolistId = 'b2a611f6-50fe-40b3-9d87-d6f169e02f47';

    useEffect( ()=> {
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}




