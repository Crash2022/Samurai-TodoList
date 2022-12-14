import React from 'react'

/*
import React from 'react'
import {FilterType} from "../App"
import {v1} from "uuid"
import styles from './Todolist.module.css'
import {AddItemForm} from "../UI/AddItemForm";
import {EditInputItem} from "../UI/EditInputItem";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: string
    addTask: (todolistId: string, titleInput: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    filterTask: (todolistId: string, filterValue: FilterType) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newInputValue: string) => void
    changeTodolistTitle: (todolistId: string, newTitleValue: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistReducer = (props: TodolistPropsType) => {

    const MESSAGE_TASKS_END = 'Задания выполнены';

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title);
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId);
    }

    const changeStatusHandler = (taskID: string, eventValue: boolean) => {
        props.changeStatus(props.todolistId, taskID, eventValue);
    }

    /!*------------------------------------------------*!/

    const onClickChangeFilter = (value: FilterType) => {
        props.filterTask(props.todolistId, value)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todolistId);
    }

    const changeTodolistTitle = (newTitleValue: string) => {
        props.changeTodolistTitle(props.todolistId, newTitleValue);
    }

    return (
        <div>
            <h3>
                {/!*{props.title}*!/}
                <EditInputItem title={props.title}
                               onChangeInput={changeTodolistTitle}
                />
                {/!*<button onClick={onClickHandlerRemoveTodoList}>X</button>*!/}
                <IconButton onClick={removeTodoList} color={'secondary'}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            {/!*<div>
                <Input inputValue={inputValue}
                       setInputValue={setInputValue}
                       onKeyPress={callBackButtonHandler}
                       error={error}
                       setError={setError}/>
                <Button
                    name={"+"}
                    callBack={callBackButtonHandler} />
            </div>*!/}

            {/!*<div className={styles.spanError}><span>{error}</span></div>*!/}

            {/!*<div>
                <button onClick={() => onClickChangeFilter('all')}
                        className={props.filter === 'all' ? styles.filterAll : styles.filterNone}>All
                </button>
                <button onClick={() => onClickChangeFilter('completed')}
                        className={props.filter === 'completed' ? styles.filterCompleted : styles.filterNone}>Completed
                </button>
                <button onClick={() => onClickChangeFilter('active')}
                        className={props.filter === 'active' ? styles.filterActive : styles.filterNone}>Active
                </button>
            </div>*!/}

            <div style={{margin: '10px'}}>
                <Button onClick={() => onClickChangeFilter('all')}
                        variant={props.filter === 'all' ? 'contained' : 'text'}>All
                </Button>
                <Button onClick={() => onClickChangeFilter('completed')}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                color={'primary'}>Completed
                </Button>
                <Button onClick={() => onClickChangeFilter('active')}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        color={'secondary'}>Active
                </Button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        const changeTaskTitleHandler = (newInputValue: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, newInputValue);
                        }

                        return (
                            <li key={v1()} className={task.isDone ? styles.isDoneTask : ''}>
                                {/!*<input type="checkbox"
                                       checked={task.isDone}
                                       onChange={(event) => changeCheckboxHandler(task.id, event.currentTarget.checked)}/>*!/}
                                <Checkbox checked={task.isDone}
                                          onChange={(event) => changeStatusHandler(task.id, event.currentTarget.checked)}
                                />
                                {/!*<span>{task.title}</span>*!/}
                                <EditInputItem title={task.title}
                                               onChangeInput={changeTaskTitleHandler}
                                />
                                {/!*<button onClick={() => {
                                    removeTaskHandler(task.id)
                                }}>X
                                </button>*!/}
                                <IconButton onClick={() => removeTaskHandler(task.id)}>
                                    <Delete />
                                </IconButton>
                            </li>
                        );
                    })
                }

                {
                    props.tasks.length === 0
                        ? <div className={styles.noTasks}>{MESSAGE_TASKS_END}</div>
                        : ''
                }
            </ul>
        </div>
    );
}
*/
