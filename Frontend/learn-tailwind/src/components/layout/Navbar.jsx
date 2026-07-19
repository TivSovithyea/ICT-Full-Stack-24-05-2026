import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Shop</h1>
        <ul className="flex space-x-4">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar