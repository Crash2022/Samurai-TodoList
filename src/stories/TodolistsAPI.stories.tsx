import React, {useEffect, useState} from 'react';
import {todolistsAPI} from "../api/todolistsAPI";
//import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolists API Story',
    //component: TodolistsAPI,
    //decorators: [ReduxStoreProviderDecorator]
} //as ComponentMeta<typeof TodolistsAPI>;

/*---------------TODOLISTS---------------*/

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect( ()=> {
        todolistsAPI.getTodolists()
            .then(response => setState(response))
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

/*---------------TASKS---------------*/

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';

    useEffect( ()=> {
        todolistsAPI.getTasks(todolistId)
            .then(response => setState(response.items))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';
    const title = 'NEW task';

    useEffect( ()=> {
        todolistsAPI.createTask(todolistId, title)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';
    const taskId = '441efd17-17bd-4db0-80ac-84b136705f17';

    useEffect( ()=> {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';
    const taskId = 'c14bedd9-a71a-418e-b078-30b08212b5bb';
    const newTitle = 'UPDATED task title'

    useEffect( ()=> {
        todolistsAPI.updateTask(todolistId, taskId, newTitle)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}
