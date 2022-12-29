import React from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {PATH} from '../../../api/path';
import {selectAppInitialized, selectAuthIsLoggedIn} from '../../../state/selectors';
import {Navigate, Outlet} from 'react-router-dom';

export const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    // const isInitialized = useAppSelector(selectAppInitialized);

    return isLoggedIn ? <Outlet/> : <Navigate to={PATH.COMMON.LOGIN}/>
}
