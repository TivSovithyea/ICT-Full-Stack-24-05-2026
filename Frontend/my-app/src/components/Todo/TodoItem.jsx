import React, { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(todo.name);

  const handleSave = () => {
    if (editName.trim()) {
      updateTodo(todo.id, editName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(todo.name); // revert to original name
    setIsEditing(false);
  };

  return (
    <li style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ccc'
    }}>
      {isEditing ? (
        // EDIT MODE
        <>
          <input 
            type="text" 
            value={editName} 
            onChange={(e) => setEditName(e.target.value)} 
            autoFocus
          />
          <div>
            <button onClick={handleSave} style={{ marginRight: '5px' }}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        // VIEW MODE
        <>
          <span>{todo.name}</span>
          <div>
            <button onClick={() => setIsEditing(true)} style={{ marginRight: '5px' }}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;