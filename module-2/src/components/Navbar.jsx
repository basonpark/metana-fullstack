import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <h1>Movie App</h1>
        <ul className="navItems">
            <h3>
                <Link className="link" to="/">Home</Link>
            </h3>
            <h3>
                <Link className="link" to="/movies">Movies</Link>
            </h3>
        </ul>
    </nav>
  )
}

export default Navbar
