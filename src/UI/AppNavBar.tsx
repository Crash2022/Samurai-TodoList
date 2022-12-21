import {AppBar, Button, Container, IconButton, LinearProgress, Typography} from "@material-ui/core";
import Toolbar from '@mui/material/Toolbar'
import {Menu} from "@material-ui/icons";
import React, {useCallback, useEffect} from "react";
import {logoutTC} from "../state/login-reducer";
import {useAppDispatch, useTypedSelector} from "../state/store";
import {AppInitialStateStatusType} from "../state/app-reducer";
import {useNavigate} from "react-router-dom";
import style from "./AppNavBar.module.css";

export const AppNavBar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn);
    const status = useTypedSelector<AppInitialStateStatusType>(state => state.app.status);

    // редирект на логин, если не залогинились
    useEffect(() => {
        !isLoggedIn && navigate('/login');
    }, [isLoggedIn])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, [])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar
                    // disableGutters
                    sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 120px' }}
                >
                    <div className={style.navbarMenu}>
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
                    </div>

                    {
                        isLoggedIn
                            ?
                            <div className={style.navbarLogout}>
                                <Button color="inherit"
                                        onClick={logoutHandler}
                                >
                                    Log Out
                                </Button>
                            </div>
                            : ''
                    }

                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </Container>
        </AppBar>
    )
}