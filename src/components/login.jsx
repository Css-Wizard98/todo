import React, { Fragment, useRef, useState, useContext } from "react";
import classes from "./login.module.css";
import { useFormik } from "formik";
import { useNavigate, Outlet } from "react-router-dom";
import { secretKey, users } from "./users";
import axios from 'axios';
import { AuthContext } from '../authContext';
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = (props) => {
    const navigate = useNavigate();
    const { loggedInUser, setLoggedUser } = useContext(AuthContext);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-={}\[\]|\\:;"'<>,.?/])(?=.*[^\s])\S{8,}$/;
    let [errorLog, seterrorLog] = useState("wrong email or password");
    const [isError, setError] = useState(false);
    function submithandler(values) {
        console.log(values);
        const email = values.name;
        const password = values.password;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential._tokenResponse);
                seterrorLog("");
                setError(false);
                setLoggedUser(userCredential._tokenResponse.idToken);
                navigate('/dashboard');
            })
            .catch((error) => {
                seterrorLog("wrong email or password");
                setError(true);
                console.log(error);
                console.log("jijijij")
                // There was an error with sign up
            });
    }
    function validationHandler(values) {
        let error = {};
        if (!values.name) {
            error.name = 'This field Is required'
        }

        if (!values.password) {
            error.password = 'This field Is required'
        } else {
            if (!passwordRegex.test(values.password)) {
                error.password = 'Password must be minimum of 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character '
            }
        }
        return error;
    }
    let profileForm = useFormik({
        initialValues: { name: '', password: '' },
        onSubmit: submithandler,
        validate: validationHandler
    });

    return (
        <div className={classes.signUp}>
            <div className={classes.sideImg}></div>
            <div className={classes.profile}>
                <form onSubmit={profileForm.handleSubmit}>
                    <div className={classes.inputs}>
                        <div className={classes.formControl}>
                            <label htmlFor="name"><div>User Name</div></label>
                            <input className={`${(profileForm.errors.name && profileForm.touched.name) ? classes.inputError : ''}`} placeholder="John Doe" type="text" name="name" id="name" onBlur={profileForm.handleBlur} onChange={profileForm.handleChange} value={profileForm.values.name} />
                            {profileForm.errors.name && profileForm.touched.name && <div className={classes.error}>{profileForm.errors.name}</div>}
                        </div>
                        <div className={classes.formControl}>
                            <label htmlFor="password">Password</label>
                            <input className={`${(profileForm.errors.password && profileForm.touched.password) ? classes.inputError : ''}`} placeholder="********" type="password" name="password" id="password" onBlur={profileForm.handleBlur} onChange={profileForm.handleChange} value={profileForm.values.password} />
                            {profileForm.errors.password && profileForm.touched.password && <div className={classes.error}>{profileForm.errors.password}</div>}
                        </div>
                    </div>

                    <footer>
                        <button type="submit">login</button>{isError && <div style={{ color: 'red' }}>{errorLog}</div>}
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default Login;