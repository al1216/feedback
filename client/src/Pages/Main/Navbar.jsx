import React from 'react';
import './Navbar.css';
import {useNavigate} from "react-router-dom"


export default function Navbar() {
  let navigate = useNavigate();

  return (
    <div className="navbar-main">
        <h1 className="heading-navbar" onClick={() => navigate(0)}>Feedback</h1>
        <div className="buttons-main">
            <button className="login-main" onClick={() => navigate('/login')}>Log in</button>
            <button className='signup-main' onClick={() => navigate('/signup')}>Sign up</button>
        </div>
    </div>
  )
}
