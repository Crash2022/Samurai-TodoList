import React from 'react'
import {FilterType} from "../App"
import {v1} from "uuid"
import styles from './Todolist.module.css'
import {AddItemForm} from "../UI/AddItemForm";
import {EditInputItem} from "../UI/EditInputItem";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskListType, TaskType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: string
    //addTask: (todolistId: string, titleInput: string) => void
    //removeTask: (todolistId: string, taskId: string) => void
    filterTask: (todolistId: string, filterValue: FilterType) => void
    //changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    //changeTaskTitle: (todolistId: string, taskId: string, newInputValue: string) => void
    changeTodolistTitle: (todolistId: string, newTitleValue: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch();
    const tasksObj = useSelector<AppRootStateType, TaskListType>(state => state.tasks);

    const MESSAGE_TASKS_END = 'Задания выполнены';

    // const removeTask = (todolistId: string, taskId: string) => {
    //     dispatch(removeTaskAC(todolistId, taskId));
    // }

    // const addTask = (todolistId: string, titleInput: string) => {
    //     dispatch(addTaskAC(todolistId, titleInput));
    // }

    const changeTaskTitle = (todolistId: string, taskId: string, newInputValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newInputValue));
    }

    // const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
    //     dispatch(changeTaskStatusAC(todolistId, taskId, newIsDone));
    // }

    /*------------------------------------------------*/

    const addTaskHandler = (todolistId: string, titleInput: string) => {
        //props.addTask(props.todolistId, title);
        dispatch(addTaskAC(todolistId, titleInput));
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        //props.removeTask(props.todolistId, taskId);
        dispatch(removeTaskAC(todolistId, taskId));
    }

    const changeStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => {
        //props.changeStatus(props.todolistId, taskID, eventValue);
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
    }

    /*------------------------------------------------*/

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
                <EditInputItem title={props.title}
                               onChangeInput={changeTodolistTitle}
                />
                <IconButton onClick={removeTodoList} color={'secondary'}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

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
                    tasksObj.map( task => {

                        const changeTaskTitleHandler = (newInputValue: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, newInputValue);
                        }

                        return (
                            <li key={v1()} className={task.isDone ? styles.isDoneTask : ''}>
                                <Checkbox checked={task.isDone}
                                          onChange={(event) => changeStatusHandler(task.id, event.currentTarget.checked)}
                                />
                                <EditInputItem title={task.title}
                                               onChangeInput={changeTaskTitleHandler}
                                />
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