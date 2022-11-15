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
import {
    updateTodolistFilterAC,
    deleteTodolistTC,
    updateTodolistTitleTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import {TaskAPIType, TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";
import {v1} from "uuid";

export type TodolistPropsType = {
    todolist: TodolistDomainType
    // todolistId: string
    // title: string
    // filter: string
    demo?: boolean
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({demo = false, ...props}) => {

    console.log('todolist')

    // используем типизированный Dispatch
    const dispatch = useAppDispatch();
    const tasksObj = useSelector<AppRootStateType, Array<TaskAPIType>>(state => state.tasks[props.todolist.id]);

    const MESSAGE_TASKS_END = 'Задания выполнены';

    /*------------------------------------------------*/

    const addTaskHandler = useCallback((titleInput: string) => {
        dispatch(createTaskTC(/*props.todolistId, titleInput)*/ {
            todoListId: props.todolist.id, id: v1(), title: titleInput,
            status: TaskStatuses.New, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }));
    },[props.todolist.id])

    // const addTaskHandler = useCallback((titleInput: string) => {
    //     dispatch(addTaskAC(props.todolistId, titleInput));
    // },[props.todolistId])

    const onChangeTodolistTitle = useCallback((newInputValue: string) => {
        dispatch(updateTodolistTitleTC(props.todolist.id, newInputValue));
    },[props.todolist.id])

    // const onChangeTodolistTitle = useCallback((newInputValue: string) => {
    //     dispatch(changeTodolistTitleAC(props.todolistId, newInputValue));
    // },[props.todolistId])

    const onClickRemoveTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(props.todolist.id));
    },[props.todolist.id])

    // const onClickRemoveTodolist = useCallback(() => {
    //     dispatch(removeTodolistAC(props.todolistId));
    // },[props.todolistId])

    /*------------------------------------------------*/

    let filteredTasks = tasksObj;

    if (props.todolist.filter === 'active') {
        filteredTasks = filteredTasks.filter(f => f.status === TaskStatuses.New); // !f.status
    }
    if (props.todolist.filter === 'completed') {
        filteredTasks = filteredTasks.filter(f => f.status === TaskStatuses.Completed); // f.status
    }

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(getTasksTC(props.todolist.id));
    },[])

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title}
                              onChangeInput={onChangeTodolistTitle}
                />
                <IconButton onClick={onClickRemoveTodolist} color="secondary"
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>

            <div style={{margin: '10px'}}>
                {/*<ButtonExample todolistId={props.todolistId} filter={props.filter} buttonTitle={'all'}/>*/}
                <Button onClick={() => dispatch(updateTodolistFilterAC(props.todolist.id, 'all'))}
                        variant={props.todolist.filter === 'all' ? 'contained' : 'text'}>All
                </Button>
                <Button onClick={() => dispatch(updateTodolistFilterAC(props.todolist.id,'completed'))}
                        variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                color={'primary'}>Completed
                </Button>
                <Button onClick={() => dispatch(updateTodolistFilterAC(props.todolist.id,'active'))}
                        variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        color={'secondary'}>Active
                </Button>
            </div>
            <ul>
                {
                    filteredTasks.map(task => {
                        return (
                            <Task key={task.id}
                                  todolistId={props.todolist.id}
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