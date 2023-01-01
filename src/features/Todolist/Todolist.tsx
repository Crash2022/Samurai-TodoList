import React, {useCallback, useEffect} from 'react'
import s from '../../common/styles/Todolist.module.css'
import {AddItemForm} from '../../common/components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {Button, IconButton, Paper} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {createTaskTC, getTasksTC} from '../../state/tasks-reducer';
import {Task} from '../Task/Task';
import {
    TodolistDomainType,
    updateTodolistFilterAC,
    deleteTodolistTC,
    updateTodolistTitleTC, FilterType
} from '../../state/todolists-reducer';
import {TaskAPIType, TaskPriorities, TaskStatuses} from '../../api/todolistsAPI';
import {v1} from 'uuid';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {AppRootStateType} from '../../state/store';
import {useSelector} from 'react-redux';
import {PropTypes} from '@mui/material';

type TodolistPropsType = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({demo = false, todolist}) => {

    console.log('todolist')

    const dispatch = useAppDispatch();
    // const tasksObj = useAppSelector(selectTasksObj[todolist.id]);
    const tasksObj = useSelector<AppRootStateType, Array<TaskAPIType>>(state => state.tasks[todolist.id]);

    // const MESSAGE_TASKS_END = 'Задания выполнены';
    const MESSAGE_TASKS_END = 'No tasks in this todolist';

    /*------------------------------------------------*/

    const addTaskHandler = useCallback((titleInput: string) => {
        dispatch(createTaskTC({
            todoListId: todolist.id, id: v1(), title: titleInput,
            status: TaskStatuses.New, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }));
    }, [todolist.id])

    // const addTaskHandler = useCallback((titleInput: string) => {
    //     dispatch(addTaskAC(todolistId, titleInput));
    // },[todolistId])

    const changeTodolistTitleHandler = useCallback((newInputValue: string) => {
        dispatch(updateTodolistTitleTC({todolistId: todolist.id, title: newInputValue}));
        // react-redux
        // dispatch(updateTodolistTitleTC( todolist.id, newInputValue));
    }, [todolist.id])

    // const changeTodolistTitleHandler = useCallback((newInputValue: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, newInputValue));
    // },[todolistId])

    const removeTodolistHandler = useCallback(() => {
        dispatch(deleteTodolistTC(todolist.id));
    }, [todolist.id])

    // const removeTodolistHandler = useCallback(() => {
    //     dispatch(removeTodolistAC(todolistId));
    // },[todolistId])

    /*------------------------------------------------*/

    let filteredTasks = tasksObj;

    if (todolist.filter === 'active') {
        filteredTasks = filteredTasks.filter(f => f.status === TaskStatuses.New); // !f.status
    }
    if (todolist.filter === 'completed') {
        filteredTasks = filteredTasks.filter(f => f.status === TaskStatuses.Completed); // f.status
    }

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(getTasksTC(todolist.id));
    }, [])

    /*------------------------------------------------*/

    // фильтрация тудулиста в одной функции
    const updateAllFilterButtonHandler = useCallback((filter: FilterType) => {
        dispatch(updateTodolistFilterAC({id: todolist.id, filter: filter}))
    }, [todolist.id])

    // фильтрация тудулиста в разнах функциях
    /*const updateFilterAll = () => {
        dispatch(updateTodolistFilterAC({id: todolist.id, filter: 'all'}))
    }
    const updateFilterCompleted = () => {
        dispatch(updateTodolistFilterAC({id: todolist.id, filter: 'completed'}))
    }
    const updateFilterActive = () => {
        dispatch(updateTodolistFilterAC({id: todolist.id, filter: 'active'}))
    }*/

    const renderFilterButton = (/*onClick: () => void,*/ filter: FilterType,
                                buttonName: string, color: PropTypes.Color) => {
        return (
            <Button onClick={() => {
                updateAllFilterButtonHandler(filter)
            }}
                    variant={todolist.filter === filter ? 'contained' : 'text'}
                    color={color}
            >
                {buttonName}
            </Button>
        )
    }

    /*------------------------------------------------*/

    return (
        // <div>
        <Paper elevation={8} className={s.todolistPaper}>
            <div className={s.todolistTitleBlock}>
                <div className={s.todolist_title}>
                    <h3 className={s.h3}>
                        <EditableSpan title={todolist.title}
                                      onChangeInput={changeTodolistTitleHandler}
                        />
                    </h3>
                </div>

                <div className={s.todolist_deleteBtn}>
                    <IconButton onClick={removeTodolistHandler} color="secondary"
                                disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>

            <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>

            <div className={s.filterButtons}>
                {/*<ButtonExample todolistId={todolistId} filter={props.filter} buttonTitle={'all'}/>*/}

                {renderFilterButton('all', 'All', 'default')}
                {/*<Button onClick={updateFilterAll}
                        variant={todolist.filter === 'all' ? 'contained' : 'text'}>
                    All
                </Button>*/}

                {renderFilterButton('completed', 'Completed', 'primary')}
                {/*<Button onClick={updateFilterCompleted}
                        variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                        color={'primary'}>
                    Completed
                </Button>*/}

                {renderFilterButton('active', 'Active', 'secondary')}
                {/*<Button onClick={updateFilterActive}
                        variant={todolist.filter === 'active' ? 'contained' : 'text'}
                        color={'secondary'}>
                    Active
                </Button>*/}
            </div>
            <ul>
                {
                    filteredTasks.map(task => {
                        return (
                            <Task key={task.id}
                                  todolistId={todolist.id}
                                  task={task}
                            />
                        )
                    })
                }
            </ul>
            {
                tasksObj.length === 0
                    ? <div className={s.noTasks}>{MESSAGE_TASKS_END}</div>
                    : ''
            }
        </Paper>
        // </div>
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
//         <Button onClick={() => dispatch(changeTodolistFilterAC(todolistId, 'all'))}
//                 variant={props.buttonTitle === props.filter ? 'contained' : 'text'}>
//         {props.buttonTitle}
//         </Button>
//     )
// })