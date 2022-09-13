import React, {useState} from 'react'
import {FilterType} from "../App"
import {Input} from "../UI/Input"
import {Button} from "../UI/Button"
import {v1} from "uuid"
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string)=>void
    filterTask: (filterValue: FilterType, todolistId: string)=>void
    addTask: (titleInput:string, todolistId: string) => void
    changeCheckbox: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: string
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            props.addTask(trimValue, props.id)
            setInputValue('')
        } else {
            setError('Поле обязательно для заполнения!');
        }
    }

    const onClickChangeFilter = (value: FilterType) => {
        props.filterTask(value, props.id)
    }
    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    const changeCheckboxHandler = (tID: string, eventValue: boolean) => {
        props.changeCheckbox(tID, eventValue, props.id);
    }

    const onClickHandlerRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={onClickHandlerRemoveTodoList}>X</button></h3>
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
            </div>
            <ul>
                {props.tasks.map((task)=> {

                    return (
                        <li key={v1()} className={task.isDone ? styles.isDoneTask : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={ (event)=> changeCheckboxHandler(task.id, event.currentTarget.checked) }/>
                            <span>{task.title}</span>
                            <button onClick={ ()=> {removeTaskHandler(task.id)} }>X</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}