  import "./App.css";
  import { useState } from "react";

  function App() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [editable, setEditable] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    //Active when change in input
    const taskTitleHandler = (e) => {
      setTaskTitle(e.target.value);
    };
    
    //Active when form is submitted
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (!taskTitle.trim()) {
        return alert("You have to add a task");
      }
      editable ? updateHandler() : createHandler();
    };

    //Active when from is submitted and not editable
    const createHandler = () => {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: taskTitle,
          isCompleted: false
        },
      ]);
      setTaskTitle("");
    };

    //Active when update button is clicked and editable
    const updateHandler = () => {
      const updatedTask = tasks.map((task)=>{
        if(task.id === editableTask.id){
          return{
            ...task,
            title: taskTitle
          }
        }
        return task;
      });
      setTasks(updatedTask);
      setEditable(false);
      setTaskTitle('');
    };

    const editHandler = (task) => {
      setEditable(true);
      setTaskTitle(task.title);
      setEditableTask(task);
    };

    //When delete button is clicked
    const deleteTaskHandler = (taskID) => {
      setTasks(
        tasks.filter((task) => {
          return task.id !== taskID;
        })
      );
    };
  
    //Active when mark as completed button clicked
    const completeTaskHandler =(taskID)=>{
      
    }

    const taskList = tasks.map((task,index) => {
      return (
        <li key={task.id}>
          {index+1 }. {task.title}
          <button
            className="icon-edit"
            onClick={() => editHandler(task)}
          >
            Edit
          </button>
          <button
            className="icon-delete"
            onClick={() => {
              deleteTaskHandler(task.id);
            }}
          >
            Delete
          </button>
          <button
            className="icon-delete"
            onClick={() => {
              completeTaskHandler(task.id);
            }}
          >
            Mark as Completed
          </button>
        </li>
      );
    });
    return (
      <>
        <div className="form-container">
          <form onSubmit={formSubmitHandler}>
            <input
              type="text"
              placeholder="add task"
              value={taskTitle}
              onChange={taskTitleHandler}
            />
            <button type="submit">
              {editable ? "Update Task" : "Add new Task"}
            </button>
            
          </form>
          {tasks.length === 0 && "No task found"}
          <ul className="tasklists">{taskList}</ul>
        </div>
      </>
    );
  }

  export default App;
