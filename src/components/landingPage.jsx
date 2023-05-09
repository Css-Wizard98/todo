import React, { Fragment } from "react";
import classes from "./landingPage.module.css";
import { useNavigate } from "react-router-dom";

const LandingPage = props =>{
    const navigate  = useNavigate();
    function clickhandler(){
        navigate('/dashboard');
    }
    return(<div className={classes.LandingPage}>
        <div className={classes.sideBar}>
            <div>
                <h1>
                    ToDo Daily
                </h1>
                <div>
                    <h3>Write all your task to one note.</h3>
                    <h3>Don't let your day do nothing.</h3>
                    <button onClick={clickhandler}>Go TO Dashboard</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LandingPage;