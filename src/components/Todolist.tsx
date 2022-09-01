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
    const [error, setError] = useState<string>('')

    const callBackButtonHandler = () => {
        /*3 разных способа*/
        /*if (inputValue) {
            props.addTask(inputValue)
            setInputValue('')
        } else {
            setError('Поле обязательно для заполнения!');
        }*/

        /*if (inputValue.trim() !== '') {
            props.addTask(inputValue);
            setInputValue('');
        } else {
            setError('Поле обязательно для заполнения!');
        }*/

        if (inputValue.trim() === '') {
            return setError('Поле обязательно для заполнения!');
        } else {
            props.addTask(inputValue);
            setInputValue('');
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

    return (
        <div>
            <h3>{props.title}</h3>
            <p className={styles.spanError}><span>{error}</span></p>
            <div>
                <Input inputValue={inputValue}
                       setInputValue={setInputValue}

                       /*callback={onKeyDownHandler}*/

                       onKeyPress={callBackButtonHandler}
                       error={error}
                       setError={setError}/>
                <Button
                    name={"+"}
                    callBack={callBackButtonHandler} />
            </div>
            <ul>
                {props.tasks.map((task)=> {

                    const changeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckbox(task.id, event.currentTarget.checked);
                    }

                    return (
                        <li key={v1()} className={task.isDone ? styles.isDoneTask : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={changeCheckboxHandler}/>
                            <span>{task.title}</span>
                            <button onClick={()=> {removeTaskHandler(task.id)}}>X</button>
                        </li>
                    );
                })}
            </ul>
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
        </div>
    );
}