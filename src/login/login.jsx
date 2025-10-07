import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <>
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
        <button onClick={() => navigate('/createstory')}>Login</button>
        <button onClick={() => navigate('/createstory')}>Create</button>
      </section>
      <footer>
        <hr />
        <a href="https://github.com/nicholasA113/startup">Github</a>
      </footer>
    </>
  );
}
