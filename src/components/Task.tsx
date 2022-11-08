import React, {ChangeEvent, useCallback} from 'react'
import {v1} from "uuid"
import styles from './Todolist.module.css'
import {EditableSpan} from "../UI/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskAPIType, TaskStatuses} from "../api/todolistsAPI";

export type TaskPropsType = {
    todolistId: string
    task: TaskAPIType
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('task')

    const dispatch = useDispatch();

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(props.todolistId, props.task.id));
    },[props.todolistId, props.task.id])

    const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New));
    },[props.todolistId, props.task.id])

    const changeTaskTitleHandler = useCallback((newInputValue: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newInputValue));
    },[props.todolistId, props.task.id])

    return (
        <li key={v1()} className={props.task.status === TaskStatuses.Completed ? styles.isDoneTask : ''}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed}
                      onChange={changeStatusHandler}
            />
            <EditableSpan title={props.task.title}
                          onChangeInput={changeTaskTitleHandler}
            />
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    );
})