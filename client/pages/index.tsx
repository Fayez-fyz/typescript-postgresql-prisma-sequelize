import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [todos, setTodos] = React.useState<any>([])
  const [title, setTitle] = React.useState<string>('')
  const [id, setId] = React.useState<number>(0)
  const [update, setUpdate] = React.useState<string>('')
  const [uptVisible, setUptVisible] = React.useState<boolean>(false);

  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos: () => void = async () => {
    try {
      const response: Response = await fetch('http://localhost:5000/api/todos')
      const data: any = await response.json()
      setTodos(data.todo)
      console.log('Hi', data.todo)
    } catch (error) {
      console.log(error)

    }
  }

  const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = async (event) => {
    event.preventDefault()
    try {
      const response: Response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
        })
      })
      const data: any = await response.json()

      setTitle('')

      fetchTodos()

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete: (id: number) => void = async (id) => {
    try {
      const response: Response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data: any = await response.json()
      // setTodos(data)
      fetchTodos()

    } catch (error) {
      console.log(error)
    }
  }

  const fetchUpdate: (id: number) => void = async (id) => {
    try {
      const response: Response = await fetch(`http://localhost:5000/api/todos/${id}`)
      const data: any = await response.json()
      setUpdate(data.todo.title)
      setId(data.todo.id)
      setUptVisible(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void = async (event) => {
    event.preventDefault()
    try {
      const response: Response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: update,
        })
      })
      const data: any = await response.json()
      setUpdate("");
      setUptVisible(false)
      fetchTodos()
    } catch (error) {
      console.log(error)
    }
  }








  return (
    <div >
      <div className="container">
        <div className="text-center">
          <h1>TODO APP</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {uptVisible ? (<>
            <form onSubmit={handleUpdate}>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="Add your todo"
                  className="form-control"
                  value={update}
                  onChange={(e) => setUpdate(e.target.value)}

                />
                <button className="btn btn-primary" type="submit">
                  UPDATE
                </button>
              </div>

            </form>
          </>) : (<>
            <form onSubmit={handleSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="Add your todo"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}

                />
                <button className="btn btn-primary" type="submit">
                  ADD
                </button>
              </div>

            </form>


          </>)}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <ol className="list-group list-group-numbered w-50 my-2">
            {todos.map((todo: any) => (
              <li  key={todo.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{todo.title}</div>
                </div>
                <span
                  className="badge bg-primary rounded-pill mx-2"
                  onClick={() => fetchUpdate(todo.id)}
                // onClick={() => fetchUpdate(todo.id)}
                >
                  Edit
                </span>
                <span
                  className="badge bg-danger rounded-pill"
                  onClick={() => handleDelete(todo.id)}
                // onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </span>
              </li>

          ))}

          </ol>
        </div>
      </div>


    </div>
  )
}

export default Home;
