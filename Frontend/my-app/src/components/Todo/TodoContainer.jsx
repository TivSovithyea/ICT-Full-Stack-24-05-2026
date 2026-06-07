import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoContainer() {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Breakfast' },
    { id: 2, name: 'Study' },
    { id: 3, name: 'Take Break' }
  ]);

  // CREATE
  const addTodo = (name) => {
    const newTodo = {
      id: Date.now(),
      name: name
    };
    setTodos([...todos, newTodo]);
  };

  // UPDATE
  const updateTodo = (id, newName) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, name: newName } : todo
    ));
  };

  // DELETE
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Todo App</h2>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default TodoContainer;