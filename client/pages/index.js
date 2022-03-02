import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [update, setUpdate] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setDescription("");
      fetchTodos()
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      const data = await deleteTodo.json();
      console.log(data);
      fetchTodos();
    } catch (error) {
      console.error(error.message);
    }
  };
const fetchUpdate = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await response.json();
   
    setUpdate(data[0].description);
    setId(data[0].todo_id);
    // setId(data.todo_id);
    // setUpdate(data.description);
    console.log(update);
    console.log(id)
  } catch (error) {
    console.error(error.message);
  }
}



  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: update }),
      });
      const data = await response.json();
      console.log(data);
      setUpdate("");
      fetchTodos();
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center">TODO APP</h2>
        <div className="d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Enter your todo"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                ADD
              </button>
            </div>
          </form>
          <form onSubmit={handleUpdate} className='mx-2'>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Update your todo"
                className="form-control"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                UPDATE
              </button>
            </div>
          </form>
        </div>
 <div className="d-flex justify-content-center">
 <ol className="list-group list-group-numbered w-50 my-2">
 {todos.map((todo,i) => (<>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">{todo.description}</div>
    </div>
    <span className="badge bg-primary rounded-pill mx-2"  onClick={()=>fetchUpdate(todo.todo_id)} >{todo.todo_id}</span>
    <span className="badge bg-danger rounded-pill" onClick={()=>handleDelete(todo.todo_id)}>{todo.todo_id}</span>
  </li>
 </>))}
</ol>
 </div>
      </div>
    </div>
  );
}
