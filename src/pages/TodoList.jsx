import { useRef, useState } from "react";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSave } from "react-icons/io5";
import "./todo.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId,setEditId] = useState(0);
  const refObj = useRef();

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addingNewTask = () => {
    if (newTask.trim() !== "") {

        if(!editId){

            setTasks([...tasks, {list:newTask , id: Date.now() , status:false}]);
            setNewTask("");

        }else{

            setTasks((prevTasks) => {
                return prevTasks.map((task) =>
                  task.id === editId ? { ...task, list: newTask } : task
                );
              });
              setEditId(0);
              setNewTask('')
        }
    }else{
        refObj.current.innerHTML = '* enter a task properly.';
        setTimeout(()=>{
          refObj.current.innerHTML = '';
        },2000);
    }
  };

  const deleteTask = (id) => {
    const updateTask = tasks.filter((task) => task.id !== id);
    setTasks(updateTask);
  };

  const completeTask = (id) => {
    setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task.id === id ? { ...task, status: !task.status } : task
        );
      });
  }

  const editTask = (id) => {
        const data = tasks.find(todo => todo.id === id);
        setEditId(data.id)
        setNewTask(data.list)
  }

  return (
    <div className="main-div">
        <h1>Todo List</h1>
        <div className="task-add">
            <input
                type="text"
                className="input"
                placeholder="Enter a Task ..."
                value={newTask}
                onChange={handleInputChange}
            />
            <button className="button" onClick={addingNewTask}>
                {editId ? 'Edit' : 'Add Task'}
            </button>
        </div>
        <span className="input-validation" ref={refObj}></span>
        <hr />

      <div className="list">
            <ul style={{ listStyleType: "none", padding: "0px" }}>
            {
                tasks.sort((a,b) => b.id-a.id).map((task) => (

                    <li key={task.id} className="list-items">

                        <input type="checkbox" checked={task.status} onClick={() => completeTask(task.id)}/>

                            <div className="list-item-list" id={task.status ? 'list-item' : '' }>{task.list}</div>

                                <span>
                                    <MdEditNote
                                        className="list-item-icons"
                                        size="1.7rem"
                                        id="edit"
                                        title="Edit"
                                        onClick={() => editTask(task.id)}
                                    />
                                    <RiDeleteBin6Line
                                        className="list-item-icons"
                                        size="1.7rem"
                                        id="delete"
                                        title="Delete"
                                        onClick={() => deleteTask(task.id)}
                                    />
                                </span> 
                    </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
