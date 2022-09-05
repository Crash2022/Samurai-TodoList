import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterType} from "../App"
import {Input} from "../UI/Input"
import {Button} from "../UI/Button"
import {v1} from "uuid"
import styles from './Todolist.module.css'

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string)=>void
    filterTask: (filterValue: FilterType)=>void
    addTask: (titleInput:string) => void
    changeCheckbox: (taskId: string, isDone: boolean) => void
    filter: string
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    // const inputValueHandler = (event: ChangeEvent<HTMLInputElement>)=> {
    //     setInputValue(event.currentTarget.value)
    // }

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            props.addTask(trimValue)
            setInputValue('')
        } else {
            setError('Поле обязательно для заполнения!');
        }
    }

    const onClickChangeFilter = (value: FilterType) => {
        props.filterTask(value)
    }
    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    /*const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === "Enter" ? callBackButtonHandler() : ''
    }*/

    const changeCheckboxHandler = (tID: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(tID, event.currentTarget.checked);
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
            <div className={styles.spanError}><span>{error}</span></div>
            <div>
                <button onClick={()=>onClickChangeFilter('all')}
                        className={props.filter === 'all' ? styles.filterAll : styles.filterNone}>All</button>
                <button onClick={()=>onClickChangeFilter('completed')}
                        className={props.filter === 'completed' ? styles.filterCompleted : styles.filterNone}>Completed</button>
                <button onClick={()=>onClickChangeFilter('active')}
                        className={props.filter === 'active' ? styles.filterActive : styles.filterNone}>Active</button>

                {/*<button onClick={onClickChangeAllFilter}>All</button>
                <button onClick={onClickChangeCompletedFilter}>Completed</button>
                <button onClick={onClickChangeActiveFilter}>Active</button>*/}
            </div>
            <ul>
                {props.tasks.map((task)=> {

                    /*const changeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckbox(task.id, event.currentTarget.checked);
                    }*/

                    return (
                        <li key={v1()} className={task.isDone ? styles.isDoneTask : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={ (event: ChangeEvent<HTMLInputElement>)=> changeCheckboxHandler(task.id, event) }/>
                            <span>{task.title}</span>
                            <button onClick={ ()=> {removeTaskHandler(task.id)} }>X</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}