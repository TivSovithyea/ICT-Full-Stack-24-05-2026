import React, { useState } from 'react'

function MultipleInputForm() {

    const [form, setForm] = useState({name: '', email: ''});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.name);
    };


  return (

    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={form.name} name="name" onChange={handleChange} />
        <br/>
        <br/>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={form.email} name="email" onChange={handleChange} />
        <br/>
        <br/>
        <button type='submit'>Submit</button>
    </form>


  )
}

export default MultipleInputForm