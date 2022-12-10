import {AppBar, Button, CircularProgress, Container, Grid, IconButton, LinearProgress,
    Paper, Toolbar, Typography} from '@material-ui/core';
import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from "./UI/AddItemForm";
import {Menu} from "@material-ui/icons";
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "./state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useTypedSelector} from "./state/store";
import styles from './components/Todolist/Todolist.module.css'
import {v1} from "uuid";
import {ErrorSnackBar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {AppInitialStateStatusType, initializeAppTC} from "./state/app-reducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {logoutTC} from "./state/login-reducer";

/*https://samuraitodo.herokuapp.com/*/

/*------------------------------------------------*/

// типизация для локальных тудулистов
// export type TasksListType = {
//     [todolistId: string]: Array<TaskType>
// }

// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterType
// }
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

/*------------------------------------------------*/

// памятка по типизации для тудулистов с сервера
// startState: Array<TodolistDomainType> = ([
//     {id: todolistId1, title: 'Выучить', filter: 'all', addedDate: '', order: 0},
//     {id: todolistId2, title: 'Купить', filter: 'all', addedDate: '', order: 0}
// ])
//
// type TasksListType = {
//     [todolistId: string]: Array<TaskAPIType>
// }
//
// startState: TasksListType = ({
//     'todolistId1': [
//         {todoListId: 'todolistId1', id: v1(), title: 'HTML&CSS',
//             status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0},
//         {todoListId: 'todolistId1', id: v1(), title: 'React',
//             status: TaskStatuses.New, priority: TaskPriorities.Hi,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0}
//     ],
//     'todolistId2': [
//         {todoListId: 'todolistId2', id: v1(), title: 'Notebook',
//             status: TaskStatuses.New, priority: TaskPriorities.Low,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0},
//         {todoListId: 'todolistId2', id: v1(), title: 'New Bike',
//             status: TaskStatuses.Completed, priority: TaskPriorities.Later,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0}
//     ]
// })

/*------------------------------------------------*/

type AppWithReduxType = {
    demo?: boolean
}

export const AppWithRedux: React.FC<AppWithReduxType> = React.memo(({demo = false}) => {

    console.log('app')

    const MESSAGE_TODOS_END = 'Список задач пуст!';

    const navigate = useNavigate(); // чтобы можно было пользоваться redirect/navigate вне Routes
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const status = useSelector<AppRootStateType, AppInitialStateStatusType>(state => state.app.status);
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn);
    const isInitialized = useTypedSelector<boolean>(state => state.app.isInitialized);

    // версия с импортом из другого файла
    //const todolists = useSelector<AppRootStateType, Array<TodoListType>>(todolistsReducer);

    /*------------------------------------------------*/

    // const addNewTodoList = useCallback((title: string) => {
    //     dispatch(addTodolistAC(title));
    // },[dispatch])

    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC({
            id: v1(), title: title, filter: 'all',
            entityStatus: 'idle', addedDate: '', order: 0
        }));
    }, [dispatch])

    /*------------------------------------------------*/

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(getTodolistsTC());
    }, [isLoggedIn])

    // инициализация приложения
    useEffect(() => {
        dispatch(initializeAppTC());
    }, [])

    // редирект на логин, если не залогинились
    useEffect(() => {
        !isLoggedIn && navigate('/login');
    }, [isLoggedIn])

    // перед проверкой на инициализацию
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, [])

    // лоадер, если приложение не инициализировано
    if (!isInitialized) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
                <CircularProgress/>
            </div>
        )
    }

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

                        {
                            isLoggedIn
                                ? <Button color="inherit"
                                          onClick={logoutHandler}
                                  >
                                    Log Out
                                  </Button>
                                : ''
                        }

                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <ErrorSnackBar/>
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

                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={

                        todolists.length !== 0 ?

                            <Grid container spacing={5} justifyContent={'center'}>
                                {
                                    todolists.map(todo => {
                                        return (
                                            <Grid item key={todo.id}>
                                                <Paper style={{padding: '15px'}} elevation={8}>
                                                    <Todolist
                                                        todolist={todo}
                                                        // todolistId={todo.id}
                                                        // title={todo.title}
                                                        // filter={todo.filter}
                                                        demo={demo}
                                                    />
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            : <div className={styles.todoEnd}>{MESSAGE_TODOS_END}</div>

                    }/>
                </Routes>

                {/*{
                        todolists.length !== 0 ?

                            <Grid container spacing={5} justifyContent={'center'}>
                                {
                                    todolists.map(todo => {
                                        return (
                                            <Grid item key={todo.id}>
                                                <Paper style={{padding: '15px'}} elevation={8}>
                                                    <Todolist
                                                        todolist={todo}
                                                        // todolistId={todo.id}
                                                        // title={todo.title}
                                                        // filter={todo.filter}
                                                        demo={demo}
                                                    />
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            : <div className={styles.todoEnd}>{MESSAGE_TODOS_END}</div>
                    }*/}

            </Container>

        </div>
    );
})