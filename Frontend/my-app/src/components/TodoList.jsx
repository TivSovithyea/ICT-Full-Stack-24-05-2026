import React, { useState } from 'react';

function List({ todos, updateTodo, deleteTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // Starts the editing process for a specific row
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditName(todo.name);
  };

  // Saves the changes and exits edit mode
  const handleSave = (id) => {
    if (editName.trim()) {
      updateTodo(id, editName);
    }
    setEditingId(null);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: '10px' }}>
          
          {/* Conditional Rendering: Edit Mode vs View Mode */}
          {editingId === todo.id ? (
            <>
              <input 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
              />
              <button onClick={() => handleSave(todo.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ marginRight: '10px' }}>{todo.name}</span>
              <button onClick={() => startEdit(todo)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}

        </li>
      ))}
    </ul>
  );
}

export default List;