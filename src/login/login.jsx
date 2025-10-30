import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/createstory');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/createstory');
      } else if (response.status === 409) {
        setError('Username already exists.');
      } else {
        setError('Account creation failed.');
      }
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <main>
      <header id="title-header">
        <h1 id="mad-libs-title">Mad Libs©</h1>
      </header>

      <section id="welcome-section">
        <div id="welcome">
          <p><i>Welcome to Mad Libs©! Please login or sign up to get started.</i></p>
        </div>

        <div id="user-password">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />
        <Button className="buttons" onClick={handleLogin}>Login</Button>
        <Button className="buttons" onClick={handleCreate}>Create</Button>

        {error && (
          <p
            style={{
              color: 'white',
              backgroundColor: '#d32f2f',
              padding: '8px',
              borderRadius: '4px',
              margin: '10px auto',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}
      </section>

      <footer className="footer">
        <hr />
        <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">
          Github
        </NavLink>
      </footer>
    </main>
  );
}