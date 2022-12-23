import React from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import {PATH} from "../../api/path";
import {selectAuthIsLoggedIn} from "../../state/selectors";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to={PATH.COMMON.LOGIN} />
}
