import React, { useState } from 'react'

function Todo() {

    const [todos, setTodos] = useState([
        {
            id: 1,
            name: "Wake Up"
        },
        {
            id: 2,
            name: "Eat Breakfast"
        }
    ]);

    const [name, setName] = useState("");

    const [updateId, setUpdateId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim() === "") {
            alert("Please enter a todo name");
            return;
        }

        // Handle Update Scenario
        if(updateId !== null) {
            const updatedTodo = todos.map(todo => {
                if(todo.id === updateId) {
                    return {
                        ...todo,
                        name: name
                    }
                }
                return todo;
            });
            setTodos(updatedTodo);
            setUpdateId(null);
            setName("");
            return;
        }

        const newTodo = {
            id: new Date(),
            name: name
        }
        setTodos([...todos, newTodo]);
        setName("")
    };

    const onDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const onUpdate = (id) => {
        const updatedTodo = todos.find(todo => todo.id === id);
        setName(updatedTodo.name);
        setUpdateId(id);
    };

  return (
    <>
        <div style={{'textAlign': 'center', 'fontWeight': 'bold'}}>Todo App</div>
        <form onSubmit={handleSubmit}>
            <label>Todo Name:</label>&nbsp;&nbsp;
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />&nbsp;&nbsp;
            <button type='submit'>Submit</button>
        </form>
        <ul>
            {todos.map(todo => {
                return (
                    <li style={{'marginTop': '5px'}} key={todo.id}>{todo.name} &nbsp;&nbsp;
                        <button onClick={() => onUpdate(todo.id)}>Update</button> &nbsp;&nbsp;
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                    </li>
                )
            })}
        </ul>
    </>
  )
}

export default Todo