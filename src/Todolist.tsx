import React, {useState} from 'react';
import {FilterType} from "./App";
import {Input} from "./Input";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask:(titleInput:string) => void
    removeTask: (taskId: number)=>void
    filterTask: (filterValue: FilterType)=>void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState('')
    //console.log(inputValue)

    const callBackButtonHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input inputValue={inputValue} setInputValue={setInputValue}/>
                <Button name={"+"} callBack={callBackButtonHandler}/>
            </div>
            <ul>
                {props.tasks.map((task, index)=> {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone} onChange={() => {}}/>
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