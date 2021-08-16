import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Routes } from '../../constants/routes';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/slices/auth/authSlice';
import './index.css';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  function handleLogin() {
    dispatch(login({ username, password }));
  }
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <p>
          Edit <code>src/containers/Login.tsx</code> and save to reload.
        </p>
        <div className="input-container">
          <label htmlFor="username">
            Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} name="username" />
          </label>
          <label htmlFor="password">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              type="password"
            />
          </label>
        </div>
        <div className="button">
          <button onClick={handleLogin}>Submit</button>
        </div>
        <div className="links">
          <Link to={Routes.Home}>Back Home</Link>
          <Link to={Routes.Register}>Register</Link>
        </div>
      </header>
    </div>
  );
};

export default Login;
