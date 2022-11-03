import React, {useEffect, useState} from 'react';
//import {ComponentMeta} from "@storybook/react";
import axios from "axios";
import {todolistsAPI} from "../api/todolistsAPI";
//import {Task} from "../components/Task";
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
    const todolistId = '012bd263-8bab-4015-9e08-0f50a1a237b2';

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

    useEffect( ()=> {
        todolistsAPI.updateTodolist(newTitle)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}




