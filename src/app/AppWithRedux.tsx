import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container} from '@material-ui/core';
import {todolistsThunks} from '../state/todolists-reducer';
import {ErrorSnackBar} from '../common/components/ErrorSnackBar/ErrorSnackBar';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {AppNavBar} from '../common/components/AppNavBar/AppNavBar';
import s from '../common/styles/Todolist.module.css'
import {selectAppInitialized, selectAuthIsLoggedIn, selectTodolists} from '../state/selectors';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {PATH} from '../api/path';
import {Error404} from '../common/components/Error404/Error404';
import {TodolistMain} from '../features/Todolist/TodolistMain';
import {PrivateRoutes} from '../common/components/PrivateRoutes/PrivateRoutes';
import {appThunks} from '../state/app-reducer';

/*https://samuraitodo.herokuapp.com/*/

/*------------------------------------------------*/

type AppWithReduxType = {
    demo?: boolean
}

export const AppWithRedux: React.FC<AppWithReduxType> = React.memo(({demo = false}) => {

    console.log('app')

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    const isInitialized = useAppSelector(selectAppInitialized);
    const todolists = useAppSelector(selectTodolists);

    /*------------------------------------------------*/

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        if (!todolists.length) {
            dispatch(todolistsThunks.getTodolistsTC());
        }
    }, [isLoggedIn])

    // инициализация приложения
    useEffect(() => {
        dispatch(appThunks.initializeAppTC());
    }, [])

    // редирект на логин, если не залогинились
    useEffect(() => {
        !isLoggedIn && navigate(PATH.COMMON.LOGIN);
    }, [isLoggedIn])


    // лоадер, если приложение не инициализировано
    if (!isInitialized) {
        return (
            <div className="circularProgress">
                <CircularProgress/>
            </div>
        )
    }

    /*------------------------------------------------*/

    return (
        <div className='App'>

            <div className={s.appNavBar}>
                <AppNavBar/>
                <ErrorSnackBar/>
            </div>

            <Container fixed className={s.appContainer}>

                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path={'/'} element={<Navigate to={PATH.APP.TODOLISTS}/>}/>
                        <Route path={PATH.APP.TODOLISTS} element={<TodolistMain demo={demo}/>}/>
                    </Route>

                    <Route path={PATH.COMMON.LOGIN} element={<Login/>}/>
                    <Route path={PATH.COMMON.ERROR404} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={PATH.COMMON.ERROR404}/>}/>
                </Routes>

            </Container>

        </div>
    );
})