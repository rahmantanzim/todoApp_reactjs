import "./App.css";
import { useState } from "react";

const allTasks = [];
function App() {
  const [tasks, setTasks] = useState(allTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [editable, setEditable] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  const taskTitleHandler = (e) => {
    setTaskTitle(e.target.value);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      return alert("You have to add a task");
    }
    editable ? updateHandler() : createHandler();
  };
  const createHandler = () => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskTitle,
      },
    ]);
    setTaskTitle("");
  };
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
  const deleteTaskHandler = (taskID) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== taskID;
      })
    );
  };
  const taskList = tasks.map((task) => {
    return (
      <li key={task.id}>
        {task.title}
        <button
          className="icon-edit"
          style={{ color: "Blue" }}
          onClick={() => editHandler(task)}
        >
          Edit
        </button>
        <button
          className="icon-delete"
          onClick={() => {
            deleteTaskHandler(task.id);
          }}
          style={{ color: "red" }}
        >
          Delete
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
