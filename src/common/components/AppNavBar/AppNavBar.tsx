import {AppBar, Button, Container, IconButton, LinearProgress, Typography} from '@material-ui/core';
import Toolbar from '@mui/material/Toolbar'
import {Menu} from '@material-ui/icons';
import React, {useCallback, useEffect} from 'react';
import {logoutTC} from '../../../state/login-reducer';
import {Link, useNavigate} from 'react-router-dom';
import s from './AppNavBar.module.css';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {selectAppStatus, selectAuthIsLoggedIn} from '../../../state/selectors';
import {useAppSelector} from '../../hooks/useAppSelector';
import {PATH} from '../../../api/path';

export const AppNavBar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    const status = useAppSelector(selectAppStatus);

    // редирект на логин, если не залогинились
    useEffect(() => {
        !isLoggedIn && navigate(PATH.COMMON.LOGIN);
    }, [isLoggedIn])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, [])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar
                    // disableGutters
                    sx={{display: 'flex', justifyContent: 'space-between', margin: '0 120px'}}
                >
                    <div className={s.navbarMenu}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Menu/>
                        </IconButton>
                        <Link to="/" className={s.linkStyle}>
                            <Typography variant="h6">
                                TodoLists
                            </Typography>
                        </Link>
                    </div>

                    {
                        isLoggedIn
                            ?
                            <div>
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