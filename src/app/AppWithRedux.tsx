import {CircularProgress, Container, Grid, Paper} from '@material-ui/core';
import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/Todolist/Todolist';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {createTodolistTC, getTodolistsTC} from "../state/todolists-reducer";
import styles from '../features/Todolist/Todolist.module.css'
import {v1} from "uuid";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "../state/app-reducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../state/login-reducer";
import {AppNavBar} from "../components/AppNavBar/AppNavBar";
import style from '../components/AppNavBar/AppNavBar.module.css'
import {selectAppInitialized, selectAuthIsLoggedIn, selectTodolists} from "../state/selectors";
import {useAppSelector} from "../hooks/useAppSelector";
import {useAppDispatch} from "../hooks/useAppDispatch";

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

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(selectTodolists);
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    const isInitialized = useAppSelector(selectAppInitialized);

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

            <div className={style.appNavBar}>
                <AppNavBar/>
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