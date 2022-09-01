import React, {useState} from 'react';
import {FilterType} from "../App";
import {Input} from "../UI/Input";
import {Button} from "../UI/Button";
import {v1} from "uuid";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string)=>void
    filterTask: (filterValue: FilterType)=>void
    addTask: (titleInput:string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const callBackButtonHandler = () => {
        if (inputValue) {
            props.addTask(inputValue)
            setInputValue('')
        } else {
            setError('Чтобы добавить задачу, необходимо заполнить поле!');
        }
    }

    const onClickChangeFilter = (value: FilterType) => {
        props.filterTask(value)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <p style={{color: "red"}}><span>{error}</span></p>
            <div>
                <Input inputValue={inputValue}
                       setInputValue={setInputValue}
                       onKeyPress={callBackButtonHandler}
                       error={error}
                       setError={setError}/>
                <Button
                    name={"+"}
                    callBack={callBackButtonHandler} />
            </div>
            <ul>
                {props.tasks.map((task)=> {
                    return (
                        <li key={v1()}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <button onClick={()=> {removeTaskHandler(task.id)}}>X</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={()=>onClickChangeFilter('all')}>All</button>
                <button onClick={()=>onClickChangeFilter('completed')}>Completed</button>
                <button onClick={()=>onClickChangeFilter('active')}>Active</button>

                {/*<button onClick={onClickChangeAllFilter}>All</button>
                <button onClick={onClickChangeCompletedFilter}>Completed</button>
                <button onClick={onClickChangeActiveFilter}>Active</button>*/}
            </div>
        </div>
    );
}