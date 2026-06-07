import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addTodo(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Add a new todo..." 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', width: '70%', marginRight: '5px' }}
      />
      <button type="submit" style={{ padding: '8px' }}>Add</button>
    </form>
  );
}

export default TodoForm;