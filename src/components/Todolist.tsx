import React, {ChangeEvent, useCallback} from 'react'
import {FilterType} from "../AppWithRedux"
import {v1} from "uuid"
import styles from './Todolist.module.css'
import {AddItemForm} from "../UI/AddItemForm";
import {EditInputItem} from "../UI/EditInputItem";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: string
    filterTasks: (todolistId: string, filterValue: FilterType) => void
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle: (todolistId: string, newTitleValue: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    console.log('todolist')

    const dispatch = useDispatch();
    const tasksObj = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId]);

    const MESSAGE_TASKS_END = 'Задания выполнены';

    /*------------------------------------------------*/

    const addTaskHandler = useCallback((titleInput: string) => {
        dispatch(addTaskAC(props.todolistId, titleInput));
    },[props.todolistId])

    /*------------------------------------------------*/

    let filteredTasks = tasksObj;

    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(f => !f.isDone);
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(f => f.isDone);
    }

    const onClickChangeFilter = useCallback((value: FilterType) => {
        props.filterTasks(props.todolistId, value);
    },[props.filterTasks, props.todolistId])

    return (
        <div>
            <h3>
                <EditInputItem title={props.title}
                               onChangeInput={()=>props.changeTodolistTitle(props.todolistId, props.title)}
                />
                <IconButton onClick={()=>props.removeTodoList(props.todolistId)} color={'secondary'}>
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
                    filteredTasks.map( task => {

                        const removeTaskHandler = () => {
                            dispatch(removeTaskAC(props.todolistId, task.id));
                        }

                        const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = event.currentTarget.checked;
                            dispatch(changeTaskStatusAC(props.todolistId, task.id, newIsDoneValue));
                        }

                        const changeTaskTitleHandler = (newInputValue: string) => {
                            dispatch(changeTaskTitleAC(props.todolistId, task.id, newInputValue));
                        }

                        return (
                            <li key={v1()} className={task.isDone ? styles.isDoneTask : ''}>
                                <Checkbox checked={task.isDone}
                                          onChange={changeStatusHandler}
                                />
                                <EditInputItem title={task.title}
                                               onChangeInput={changeTaskTitleHandler}
                                />
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete />
                                </IconButton>
                            </li>
                        );
                    })
                }

                {
                    tasksObj.length === 0
                        ? <div className={styles.noTasks}>{MESSAGE_TASKS_END}</div>
                        : ''
                }
            </ul>
        </div>
    );
})