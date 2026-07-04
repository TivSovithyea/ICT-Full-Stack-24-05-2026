import React from 'react'
import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <div>
            404 Not Found!
        </div>

        <NavLink to="/">Go Back</NavLink>
    </div>
  )
}

export default NotFound