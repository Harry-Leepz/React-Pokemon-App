import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-md'>
            <h4 className='text-light font-weight-bold'>Something Pokemon</h4>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item ml-3">
                    <Link to='/'>Home</Link>
                </li>
                <li className="nav-item ml-3">
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
