import {CircularProgress, Container} from '@material-ui/core';
import React, {useEffect} from 'react';
import './App.css';
import {getTodolistsTC} from "../state/todolists-reducer";
import {ErrorSnackBar} from "../common/components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "../state/app-reducer";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {AppNavBar} from "../common/components/AppNavBar/AppNavBar";
import style from '../common/components/AppNavBar/AppNavBar.module.css'
import {selectAppInitialized, selectAuthIsLoggedIn, selectTodolists} from "../state/selectors";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {PATH} from "../api/path";
import {Error404} from "../common/components/Error404/Error404";
import {TodolistMain} from "../features/Todolist/TodolistMain";
import {PrivateRoutes} from "../common/components/PrivateRoutes/PrivateRoutes";

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

    // const MESSAGE_TODOS_END = 'Список задач пуст!';

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const todolists = useAppSelector(selectTodolists);
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    const isInitialized = useAppSelector(selectAppInitialized);

    /*------------------------------------------------*/

    // const addNewTodoList = useCallback((title: string) => {
    //     dispatch(addTodolistAC(title));
    // },[dispatch])

    // const addNewTodoList = useCallback((title: string) => {
    //     dispatch(createTodolistTC({
    //         id: v1(), title: title, filter: 'all',
    //         entityStatus: 'idle', addedDate: '', order: 0
    //     }));
    // }, [dispatch])

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
        !isLoggedIn && navigate(PATH.COMMON.LOGIN);
    }, [isLoggedIn])


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

                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path={'/'} element={<Navigate to={PATH.APP.TODOLISTS}/>} />
                        <Route path={PATH.APP.TODOLISTS} element={<TodolistMain demo={demo}/>}/>
                    </Route>

                    <Route path={PATH.COMMON.LOGIN} element={<Login/>}/>
                    <Route path={PATH.COMMON.ERROR404} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={PATH.COMMON.ERROR404} />}/>
                </Routes>

            </Container>

        </div>
    );
})