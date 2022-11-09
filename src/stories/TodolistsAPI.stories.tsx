import React, {useEffect, useState} from 'react';
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../api/todolistsAPI";
import {v1} from "uuid";
//import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolists API Story',
    //component: TodolistsAPI,
    //decorators: [ReduxStoreProviderDecorator]
} //as ComponentMeta<typeof TodolistsAPI>;

/*---------------TODOLISTS---------------*/

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => setState(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    //const title = 'NEW todolist';

    const createTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then(response => setState(response.data))
            .catch(error => console.log(error))
    }

    return (
        <>
            <span>Todolist title: <input type="text" value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/></span>
            <span><button onClick={createTodolist}>Create Todolist</button></span>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </>
    );
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    //const todolistId = '3f28d2b3-3d31-465f-896e-0721bbb507f3';

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
            .catch(error => console.log(error))
    }

    return (
        <>
            <span>Todolist ID: <input type="text" value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/></span>
            <span><button onClick={deleteTodolist}>Delete Todolist</button></span>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </>
    );
}

export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    //const newTitle = 'UPDATED todolist title';
    //const todolistId = 'b2a611f6-50fe-40b3-9d87-d6f169e02f47';

    const updateTodolist = () => {
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(response => setState(response.data))
            .catch(error => console.log(error))
    }

    return (
        <>
            <span>Todolist ID: <input type="text" value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/></span>
            <span> Todolist Update Title: <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.currentTarget.value)}}/></span>
            <span><button onClick={updateTodolist}>Update Todolist</button></span>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </>
    );
}

/*---------------TASKS---------------*/

export const GetTasks = () => {

    const [state, setState] = useState<any>(null);
    const todolistId = '6ee153fa-fdae-486e-bf16-ac4c5753493a';

    useEffect(() => {
        todolistsAPI.getTasks(todolistId)
            .then(response => setState(response.items))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    //const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';
    //const title = 'NEW task';

    const createTask = async () => {
        try {
            // const createdTask = await todolistsAPI.createTask(todolistId, title);
            const createdTask = await todolistsAPI.createTask({
                todoListId: 'todolistId1', id: v1(), title: 'Angular',
                status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0
            });
            setState(createdTask);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <span>Todolist ID: <input type="text" value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/></span>
            <span> Task title: <input type="text" value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/></span>
            <span><button onClick={createTask}>Create Task</button></span>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </>
    );
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    //const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';
    //const taskId = '441efd17-17bd-4db0-80ac-84b136705f17';

    const deleteTask = async () => {
        try {
            const deletedTask = todolistsAPI.deleteTask(todolistId, taskId);
            setState(deletedTask);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <span>Todolist ID: <input type="text" value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/></span>
            <span> Task ID: <input type="text" value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/></span>
            <span><button onClick={deleteTask}>Delete Task</button></span>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </>
    );
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    //const todolistId = '58b83589-1691-4b11-bcd5-298270d98392';
    //const taskId = 'c14bedd9-a71a-418e-b078-30b08212b5bb';
    //const newTitle = 'UPDATED task title'

    const updateTask = async () => {
        // try {
        //     const updatedTask = todolistsAPI.updateTask(todolistId, taskId, {title: newTitle});
        //     setState(updatedTask);
        // }
        // catch(error) {
        //     console.log(error);
        // }
    }

    return (
        <>
            <span>Todolist ID: <input type="text" value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/></span>
            <span> Task ID: <input type="text" value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/></span>
            <span> Update Task Title: <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.currentTarget.value)}}/></span>
            <span><button onClick={updateTask}>Update Task</button></span>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </>
    );
}