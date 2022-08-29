import React, {useState} from 'react';
import {FilterType} from "./App";
import {Input} from "./Input";
import {Button} from "./Button";
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

    /*const [filter, setFilter] = useState<FilterType>('all')
    let filteredTasks = tasks1;

    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(elem=>!elem.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(elem=>elem.isDone)
    }

    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue);
    }*/

    /*------------------------------------------------*/

    const [inputValue, setInputValue] = useState('')

    const callBackButtonHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    /*const onClickChangeAllFilter = () => {
        props.filterTask('all')
    }
    const onClickChangeCompletedFilter = () => {
        props.filterTask('completed')
    }
    const onClickChangeActiveFilter = () => {
        props.filterTask('active')
    }*/

    const onClickChangeFilter = (value: FilterType) => {
        props.filterTask(value)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
<<<<<<< HEAD
                <Input inputValue={inputValue} setInputValue={setInputValue} />
                <Button name={"+"} callBack={callBackButtonHandler} />
=======
                <Input inputValue={inputValue} setInputValue={setInputValue} keyEnter={callBackButtonHandler}/>
                <Button name={"+"} callBack={callBackButtonHandler}/>
>>>>>>> e6b84df863bb50ff35b5af8d16d0527b1d7a27c4
            </div>
            <ul>
                {props.tasks.map((task)=> {
                    return (
<<<<<<< HEAD
                        <li key={v1()}>
=======
                        <li key={task.id}>
>>>>>>> e6b84df863bb50ff35b5af8d16d0527b1d7a27c4
                            <input type="checkbox" checked={task.isDone} onChange={() => {}}/>
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