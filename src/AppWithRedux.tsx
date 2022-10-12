import {AppBar, Button, Container, Grid, IconButton,
    Paper, Toolbar, Typography} from '@material-ui/core';
import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from "./UI/AddItemForm";
import {Menu} from "@material-ui/icons";
import {addTodolistAC,changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

/*https://samuraitodo.herokuapp.com/*/

export type FilterType = 'all' | 'active' | 'completed';

export type TaskListType = {
    [todolistId: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const AppWithRedux = () => {

    const MESSAGE_TASKS_END = 'Списки задач закончились!';
    const [todoEnd, setTodoEnd] = useState<string>(`${MESSAGE_TASKS_END}`);

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasksObj = useSelector<AppRootStateType, TaskListType>(state => state.tasks);

    /*------------------------------------------------*/

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }

    const addTask = (todolistId: string, titleInput: string) => {
        dispatch(addTaskAC(todolistId, titleInput));
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newInputValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newInputValue));
    }

    const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDone));
    }

    /*------------------------------------------------*/

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId));
        //dispatch(removeTodolistAC(todoListId));
    }

    const addNewTodoList = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
        //dispatch(action);
    }

    const changeTodolistTitle = (todolistId: string, newTitleValue: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitleValue));
    }

    const filterTask = (todolistId: string, filterValue: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue));
    }

    /*------------------------------------------------*/

    // Можно фильтр вынести в отдельную функцию и воспользоваться ей в map
    /*    const getTasksForTodoList = (filter: FilterType, tasks: Array<TaskType>) => {
            switch (filter) {
                case "active":
                    return tasks.filter(t => !t.isDone)
                case "completed":
                    return tasks.filter(t => t.isDone)
                default:
                    return tasks
            }
        }*/

    /*------------------------------------------------*/

    return (
        <div className="App">

            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            TodoLists
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>

            <Container fixed>
                    <Grid container style={{padding: '20px', textAlign: 'center'}} direction={'column'}>
                        <Grid item style={{padding: '10px'}}>
                            Добавить новый список
                        </Grid>
                        <Grid item>
                            <AddItemForm addItem={addNewTodoList}/>
                        </Grid>
                    </Grid>
                {
                    todolists.length !== 0 ?

                        <Grid container spacing={5} justifyContent={'center'}>
                            {
                                todolists.map(todo => {

                                    //const tasks = getTasksForTodoList(todo.filter, tasks[todo.id]);

                                    let filteredTasks = tasksObj[todo.id];

                                    if (todo.filter === 'active') {
                                        filteredTasks = filteredTasks.filter(f => !f.isDone)
                                    }
                                    if (todo.filter === 'completed') {
                                        filteredTasks = filteredTasks.filter(f => f.isDone)
                                    }

                                    return (
                                        <Grid item key={todo.id}>
                                            <Paper style={{padding: '15px'}} elevation={8}>
                                                <Todolist
                                                    todolistId={todo.id}
                                                    title={todo.title}
                                                    tasks={filteredTasks}
                                                    addTask={addTask}
                                                    removeTask={removeTask}
                                                    filterTask={filterTask}
                                                    filter={todo.filter}
                                                    changeStatus={changeStatus}
                                                    removeTodoList={removeTodoList}
                                                    changeTaskTitle={changeTaskTitle}
                                                    changeTodolistTitle={changeTodolistTitle}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        : <div>{todoEnd}</div>
                }
            </Container>

        </div>
    );
}