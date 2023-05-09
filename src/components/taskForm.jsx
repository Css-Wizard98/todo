import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./taskForm.module.css";
import { AuthContext } from '../authContext';

const TaskForm = props => {
  const [taskName, setTaskName] = useState('');
  const [subtasks, setSubtasks] = useState(['']);

  const { loggedInUser, setuserInfo} = useContext(AuthContext);

  useEffect(()=>{
    if(!(Object.keys(props.editTask).length === 0)){
        console.log(props);
        setTaskName(props.editTask.task);
        setSubtasks(props.editTask.subtask);
      }
  },[props])


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Task Name:', taskName);
    console.log('Subtasks:', subtasks);
    let obj = {task:taskName,subtask:subtasks}
    
    console.log(props.editIndex)
    if(props.editIndex != undefined){
        setuserInfo(prev => {
            prev[props.editIndex] = obj;
            return prev; 
        })
        props.taskedited();
    }else{
        setuserInfo(prev => {
            return [...prev, obj]
        })
    }

    setTaskName('');
    setSubtasks(['']);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubtaskChange = (index, event) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = event.target.value;
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = () => {
    const newSubtasks = [...subtasks];
    newSubtasks.push('');
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };
    return(<form className={classes.taskForm} onSubmit={handleSubmit}>
        <label>
          Task Name:<br/>
          <input type="text" value={taskName} onChange={handleTaskNameChange} />
        </label>
        <br />
        <label>
          Subtasks:
          {subtasks.map((subtask, index) => (
            <div className={classes.subTask} key={index}>
              <input
                type="text"
                value={subtask}
                onChange={(event) => handleSubtaskChange(index, event)}
              />
              {<button type="button" onClick={() => handleRemoveSubtask(index)}>
                Remove
              </button>}
            </div>
          ))}
          <button type="button" onClick={handleAddSubtask}>
            Add Subtask
          </button>
        </label>
        <br />
        <br />
        <br />
        <button type="submit">Add Task</button>
      </form>)
}

export default TaskForm;