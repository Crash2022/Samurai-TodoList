import React, {useEffect, useState} from 'react';
//import {ComponentMeta} from "@storybook/react";
import axios from "axios";
//import {Task} from "../components/Task";
//import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolists API StoryComponent',
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
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then(response => setState(response.data))
    }, [])

    return (
            <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect( ()=> {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'new todolist'}, settings)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect( ()=> {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/012bd263-8bab-4015-9e08-0f50a1a237b2', settings)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect( ()=> {
        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/9d0b5bc3-9ec2-4208-b117-b09a9d056e8c', {title: 'updated title'},settings)
            .then(response => setState(response.data))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}




