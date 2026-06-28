import React, { useState } from 'react'

function TodoContainer() {

    const [todos, setTodos] = useState([
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'Study' },
    ]);

    const [name, setName] = useState("");

    const handleSubmit = () => {
        if(name.trim() === "") {
            alert("Please input name");
            return;
        }
        setTodos([...todos, { id:  new Date(), name }]);
        setName("");
    }

    const update = (id) => {
        const updatedTodo = todos.find((todo) => todo.id === id);
        setName(updatedTodo.name);
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h2>Todo App</h2>
            <div>
                <label>Todo Name:</label>
                &nbsp;&nbsp;
                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                &nbsp;&nbsp;
                <button onClick={() => handleSubmit()}>Add Todo</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        borderBottom: '1px solid #ccc'
                    }}
                    key={todo.id}
                    >
                        <span>{todo.name}</span>
                        <div>
                            <button onClick={() => update(todo.id)}>Update</button> <br></br>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default TodoContainer