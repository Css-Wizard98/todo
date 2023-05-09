import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(undefined);
    const [userInfo, setuserInfo] = useState([]);
    useEffect(() => {
        console.log(localStorage.getItem('logged'));
        setLoggedInUser(localStorage.getItem('logged')??false);
    },[])
    function setLoggedUser(val) {
        setLoggedInUser(val);
        localStorage.setItem('logged', val);
    }
    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedUser, userInfo, setuserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};