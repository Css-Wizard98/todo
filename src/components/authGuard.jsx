import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../authContext';

const AuthGuard = () => {
    const { loggedInUser } = useContext(AuthContext);
    console.log(loggedInUser);

    return (
        loggedInUser ? <Outlet /> : <Navigate to="/login" />
    );
};

export default AuthGuard;
