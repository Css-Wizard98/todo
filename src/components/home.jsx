import React, { Fragment, useContext, useState } from "react";
import classes from "./home.module.css";
import TaskForm from "./taskForm";
import { AuthContext } from '../authContext';
import edit from "../utils/pen.png"


const Home = props => {
    const { loggedInUser, userInfo } = useContext(AuthContext);
    const [edittask,setEditTask] = useState({});
    const [edittaskIndex,setEditTaskIndex] = useState(undefined);
    console.log(userInfo)
    console.log(userInfo.length);
    console.log(userInfo.subtask);
    function edithandler(task,index){
        console.log(task);
        setEditTask(task);
        setEditTaskIndex(index);
    }
    function editDone(){
        console.log("edit completed");
        setEditTask({});
        setEditTaskIndex(undefined);
    }

    return (<Fragment>
        <div className={classes.header}>
            <h1>Welcome to your dashboard!</h1>
            <p>You are now logged in.</p>
        </div>
        <div className={classes.home}>


            <div>{userInfo.length > 0 &&
                userInfo.map((tasks, ind) => {
                    return <ul key={ind}>
                        <h3>=> {tasks.task} <img style={{cursor:'pointer'}} height="15px" onClick={()=> edithandler(tasks,ind)} src={edit} alt="" /></h3>
                        {tasks.subtask.length>0 && tasks.subtask.map(task => {
                            return <li>{task}</li>
                        })}
                    </ul>
                })
            }</div>

            <div><TaskForm editTask={edittask} editIndex={edittaskIndex} taskedited={editDone}></TaskForm></div>
        </div>
    </Fragment>)
}

export default Home;