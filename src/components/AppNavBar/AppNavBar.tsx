import {AppBar, Button, Container, IconButton, LinearProgress, Typography} from "@material-ui/core";
import Toolbar from '@mui/material/Toolbar'
import {Menu} from "@material-ui/icons";
import React, {useCallback, useEffect} from "react";
import {logoutTC} from "../../state/login-reducer";
import {useNavigate} from "react-router-dom";
import style from "./AppNavBar.module.css";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {selectAppStatus, selectAuthIsLoggedIn} from "../../state/selectors";
import {useAppSelector} from "../../hooks/useAppSelector";
import { PATH } from "../../api/path";

export const AppNavBar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    const status = useAppSelector(selectAppStatus);

    // редирект на логин, если не залогинились
    useEffect(() => {
        !isLoggedIn && navigate(PATH.LOGIN.LOGIN);
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
                                        style={{fontWeight: 'bold'}}
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