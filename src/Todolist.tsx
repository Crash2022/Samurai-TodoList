import React from 'react';

type TodolistPropsType = {
    title: string
    price?: number
    tasks: Array<TaskType>
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
                {props.tasks.map(elem=> {
                    return (
                        <li><input type="checkbox" checked={elem.isDone}/> <span>{elem.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}