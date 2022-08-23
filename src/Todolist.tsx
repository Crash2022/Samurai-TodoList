import React from 'react';
import {FilterType} from "./App";
/*import {FilterType} from "./App";*/

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=>void
    filterTask: (filterValue: FilterType)=>void
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
                {props.tasks.map((task, index)=> {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=> {props.removeTask(task.id)}}>X</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={()=>{props.filterTask('all')}}>All</button>
                <button onClick={()=>{props.filterTask('completed')}}>Completed</button>
                <button onClick={()=>{props.filterTask('active')}}>Active</button>
            </div>
        </div>
    );
}