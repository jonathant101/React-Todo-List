import React, { useEffect, useState, Fragment, useRef } from 'react';
import TodoList from './components/TodoList.jsx';
import uniqid from 'uniqid';
import './style.css';

const KEY = 'todoApp.todos';

export default function App() {
   
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);
 
  const [todos, setTodos] = useState([]);

  const todoTaskRef = useRef();

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    console.log(todos);
    if (task === '') return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uniqid(), task, completed: false }];
    });
    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <div className="nav"></div>
      <div
        className="divCentral d-flex flex-row"
        style={{ backgroundColor: '#b5e7a0' }}
      >
        <input
          id="textIn"
          className="m-1 form form-control"
          ref={todoTaskRef}
          type="text"
          placeholder="nueva tarea"
        />
        <button className="m-1 btn" onClick={handleTodoAdd}>
          ➕
        </button>
        <button onClick={handleClearAll} className="m-1 btn">
          🗑️
        </button>
      </div>
      <p className="div">
        {' '}
        Te quedan {todos.filter((todo) => !todo.completed).length} tareas por
        terminar
      </p>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </Fragment>
  );
}
