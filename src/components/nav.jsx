import React, { Fragment, useContext } from "react";
import classes from "./nav.module.css";
import logo from "../utils/todo.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../authContext";

const Nav = props => {
    const { loggedInUser, setLoggedUser } = useContext(AuthContext);
    console.log("::Nav Compoenent::",loggedInUser);
    const navigate  = useNavigate();
    function logouthandler(){
        setLoggedUser(false);
        navigate('/');
    }
    return (<div className={classes.navBar}>
        <img height="50px" src={logo} alt="" />
        <ul>
            <li>
                <NavLink to="/" className={(navData) => (navData.isActive ? classes.active : '')}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className={(navData) => (navData.isActive ? classes.active : '')}>
                    Dashboard
                </NavLink>
            </li>
            {loggedInUser? <li onClick={logouthandler}>
                <NavLink>
                    Logout
                </NavLink>
            </li>:<li>
                <NavLink to="/login" className={(navData) => (navData.isActive ? classes.active : '')}>
                    Login
                </NavLink>
            </li>}
        </ul>
    </div>)
}

export default Nav;