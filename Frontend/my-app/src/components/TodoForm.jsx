import React, { useState } from 'react'

function TodoForm() {

  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo.trim() == '') {
      alert("Please input todo");
      return
    }
    alert("Todo added" + todo);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </>
  )
}

export default TodoForm