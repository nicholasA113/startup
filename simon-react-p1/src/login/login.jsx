import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/play');
  };
  const handleCreate = (e) => {
    e.preventDefault();
    navigate('/play');
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <h1>Welcome to Simon</h1>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control" type="password" placeholder="password" />
          </div>
          <button type="submit" onClick={handleLogin} className="btn btn-primary m-2">
            Login
          </button>
          <button type="submit" onClick={handleCreate} className="btn btn-secondary m-2">
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
