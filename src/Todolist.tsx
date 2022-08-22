import React from 'react';
import {FilterType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=>void
    filterTasks: (filterVal: FilterType)=>void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task=> {
                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=> {props.removeTask(task.id)}}>X</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={()=>{props.filterTasks('all')}}>All</button>
                <button onClick={()=>{props.filterTasks('active')}}>Active</button>
                <button onClick={()=>{props.filterTasks('completed')}}>Completed</button>
            </div>
        </div>
    );
}