import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleLogin = () => {
    const storedTempUser = JSON.parse(localStorage.getItem('tempUser'));

    if (storedTempUser && username === storedTempUser.username && password === storedTempUser.password) {
      localStorage.setItem('tempUser', JSON.stringify({ username, password }));
      navigate('/createstory');
    } else {
      setError('User not found. Please click create or check your login information.');
    }
};

  const handleCreate = () => {
    const tempUser = {username, password};
    localStorage.setItem('tempUser', JSON.stringify({username: inputUsername}));
    navigate('/createstory');
  }

  return (
    <main>
      <header id="title-header">
        <h1 id="mad-libs-title">Mad Libs©</h1>
      </header>

      <section id="welcome-section">
        <div id="welcome">
          <p><i>Welcome to Mad Libs©! Please login or signup to get started.</i></p>
        </div>
        <div id="user-password">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <br />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <br />
        <Button className="buttons" onClick={handleLogin}>Login</Button>
        <Button className="buttons" onClick={handleCreate}>Create</Button>

        {error && (
          <p style={{ color: 'white', backgroundColor: '#d32f2f', padding: '8px', borderRadius: '4px' }}>
            {error}
          </p>
        )}
      </section>

      <footer className="footer">
        <hr />
        <NavLink className='nav-link' to="https://github.com/nicholasA113/startup">Github</NavLink>
      </footer>
    </main>
  );
}
