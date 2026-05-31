import React, { useState } from 'react'

function FormInput() {
    const [name, setName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        alert('Hello ' + name);
        setName('');
    };

  return (
    <>
        <form onSubmit={onSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' />
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default FormInput