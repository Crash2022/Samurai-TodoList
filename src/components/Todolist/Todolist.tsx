import React, {useCallback, useEffect} from 'react'
import styles from './Todolist.module.css'
import {AddItemForm} from "../../UI/AddItemForm";
import {EditableSpan} from "../../UI/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {createTaskTC, getTasksTC} from "../../state/tasks-reducer";
import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {Task} from "../Task/Task";
import {updateTodolistFilterAC, deleteTodolistTC, updateTodolistTitleTC} from "../../state/todolists-reducer";
import {TaskAPIType, TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";
import {v1} from "uuid";

export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: string
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    console.log('todolist')

    // используем типизированный Dispatch
    const dispatch = useAppDispatch();
    const tasksObj = useSelector<AppRootStateType, Array<TaskAPIType>>(state => state.tasks[props.todolistId]);

    const MESSAGE_TASKS_END = 'Задания выполнены';

    /*------------------------------------------------*/

    const addTaskHandler = useCallback((titleInput: string) => {
        dispatch(createTaskTC(/*props.todolistId, titleInput)*/ {
            todoListId: props.todolistId, id: v1(), title: titleInput,
            status: TaskStatuses.New, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }));
    },[props.todolistId])

    // const addTaskHandler = useCallback((titleInput: string) => {
    //     dispatch(addTaskAC(props.todolistId, titleInput));
    // },[props.todolistId])

    const onChangeTodolistTitle = useCallback((newInputValue: string) => {
        dispatch(updateTodolistTitleTC(props.todolistId, newInputValue));
    },[props.todolistId])

    // const onChangeTodolistTitle = useCallback((newInputValue: string) => {
    //     dispatch(changeTodolistTitleAC(props.todolistId, newInputValue));
    // },[props.todolistId])

    const onClickRemoveTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(props.todolistId));
    },[props.todolistId])

    // const onClickRemoveTodolist = useCallback(() => {
    //     dispatch(removeTodolistAC(props.todolistId));
    // },[props.todolistId])

    /*------------------------------------------------*/

    let filteredTasks = tasksObj;

    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(f => f.status === TaskStatuses.New); // !f.status
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(f => f.status === TaskStatuses.Completed); // f.status
    }

    useEffect(() => {
        dispatch(getTasksTC(props.todolistId));
    },[])

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
                {/*<ButtonExample todolistId={props.todolistId} filter={props.filter} buttonTitle={'all'}/>*/}
                <Button onClick={() => dispatch(updateTodolistFilterAC(props.todolistId, 'all'))}
                        variant={props.filter === 'all' ? 'contained' : 'text'}>All
                </Button>
                <Button onClick={() => dispatch(updateTodolistFilterAC(props.todolistId,'completed'))}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                color={'primary'}>Completed
                </Button>
                <Button onClick={() => dispatch(updateTodolistFilterAC(props.todolistId,'active'))}
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

// Чтобы реализовать useMemo для Material UI

// type ButtonPropsType = {
//     todolistId: string
//     buttonTitle: FilterType
//     filter: string
//     //color: 'primary' | 'inherit' | 'secondary'
// }
//
// const ButtonExample = React.memo((props: ButtonPropsType) => {
//     console.log('buttonExample')
//     const dispatch = useDispatch();
//
//     return (
//         <Button onClick={() => dispatch(changeTodolistFilterAC(props.todolistId, 'all'))}
//                 variant={props.buttonTitle === props.filter ? 'contained' : 'text'}>
//         {props.buttonTitle}
//         </Button>
//     )
// })