import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <main>
      <header>
        <h1>Mad Libs©</h1>
      </header>
      <section>
        <div id="welcome">
          <p><i>Welcome to Mad Libs©! Please login or signup to get started.</i></p>
        </div>
        <div id="user-password">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="username" />
          <br />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" placeholder="password" />
        </div>
        <br />
        <Button onClick={() => navigate('/createstory')}>Login</Button>
        <Button onClick={() => navigate('/createstory')}>Create</Button>
      </section>
      <footer>
        <hr />
        <NavLink className='nav-link' to="https://github.com/nicholasA113/startup">Github</NavLink>
      </footer>
    </main>
  );
}
