import React, {useCallback} from 'react'
import styles from './Todolist.module.css'
import {AddItemForm} from "../UI/AddItemForm";
import {EditableSpan} from "../UI/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterType, TaskType} from "../AppWithRedux";
import {addTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {Task} from "./Task";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";

export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: string
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

    const onChangeTodolistTitle = useCallback((newInputValue: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, newInputValue));
    },[props.todolistId])

    const onClickRemoveTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistId));
    },[props.todolistId])

    /*------------------------------------------------*/

    let filteredTasks = tasksObj;

    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(f => !f.isDone);
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(f => f.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChangeInput={onChangeTodolistTitle}
                />
                <IconButton onClick={onClickRemoveTodolist} color="secondary">
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            <div style={{margin: '10px'}}>
                {/*<ButtonExample todolistId={props.todolistId} buttonTitle={'all'}/>*/}
                <Button onClick={() => dispatch(changeTodolistFilterAC(props.todolistId, 'all'))}
                        variant={props.filter === 'all' ? 'contained' : 'text'}>All
                </Button>
                <Button onClick={() => dispatch(changeTodolistFilterAC(props.todolistId,'completed'))}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                color={'primary'}>Completed
                </Button>
                <Button onClick={() => dispatch(changeTodolistFilterAC(props.todolistId,'active'))}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        color={'secondary'}>Active
                </Button>
            </div>
            <ul>
                {
                    filteredTasks.map(task => {
                        return (
                            <Task key={task.id}
                                  todolistId={props.todolistId}
                                  task={task}
                            />
                        )
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

// type ButtonPropsType = {
//     todolistId: string
//     buttonTitle: FilterType
//     filter: string
//     //color: 'primary' | 'inherit' | 'secondary'
// }

// const ButtonExample = React.memo((props: ButtonPropsType) => {
//
//     const dispatch = useDispatch();
//
//     return (
//         <Button onClick={() => dispatch(changeTodolistFilterAC(props.todolistId, 'all'))}
//                 variant={props.buttonTitle === props.filter ? 'contained' : 'text'}>
//         {props.buttonTitle}
//         </Button>
//     )
// })