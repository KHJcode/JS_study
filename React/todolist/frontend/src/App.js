import React, { useState, useEffect } from 'react';
import './App.css';

import List from './components/List/';
import Header from './components/Header/';
import Form from './components/Form/';
import useFetch from './useFetch';

export const TodoContext = React.createContext();

const App = () => {
  const [todos, setTodos] = useState([]);

  const loading = useFetch(setTodos, 'http://localhost:8000/todo');

  const addTodo = (newTodo) => {
    setTodos([...todos, { title : newTodo, id: todos.length+1, status: 'todo' }]);
  };

  const changeTodoStatus = (id) => {
    const updateTodos = todos.map(todo => {
      if (todo.id === +id) {
        if (todo.status === 'done')  todo.status = 'todo';
        else todo.status = 'done';
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  useEffect(() => {
    console.log('새로운 내용이 렌더링 됬네요');
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, loading, changeTodoStatus
    }}>
      <Header />
      <Form />
      <List />
    </TodoContext.Provider>
  );
};

export default App;
