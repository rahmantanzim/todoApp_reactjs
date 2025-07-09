import "./App.css";
import { useState } from "react";
const allTasks = [
  
];
function App() {
  const [tasks, setTasks] = useState(allTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const taskTitleHandler = (e)=>{
    setTaskTitle(e.target.value);
  }
  const formSubmitHandler = (e)=>{
    e.preventDefault();
    if(!taskTitle.trim()){
      return alert('You have to add a task');
    }
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskTitle
      }
    ])
    setTaskTitle('');
  }
  const deleteTaskHandler = (taskID)=>{
    setTasks(tasks.filter((task)=>{
      return task.id!== taskID;
    }));
  }
  const taskList = tasks.map((task)=>{
      return <li key={task.id}>
        <span>{task.title} </span>
        <span style={{color:'Blue'}}>Edit</span>  
        <span onClick={()=>{deleteTaskHandler(task.id)}} style={{color:'red'}}>Delete</span></li>
  })
  return <>
    <form onSubmit={formSubmitHandler}>
      <input type="text" placeholder="add task" value={taskTitle} onChange={taskTitleHandler} />
      <button type='submit'>Add Task</button>
    </form>
    {tasks.length === 0 && 'No task found'}
    <ul>
      {taskList}
    </ul>
  </>;
}

export default App;
