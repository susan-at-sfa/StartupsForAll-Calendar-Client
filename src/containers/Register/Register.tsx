import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Routes } from '../../constants/routes';
import { useAppDispatch } from '../../hooks';
import { register } from '../../store/slices/auth/authSlice';
import './index.css';

const Register: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  function handleRegister() {
    dispatch(register({ username, email, password }));
  }
  
  return (
    <div className="Register">
      <header className="Register-header">
        <img src={logo} className="Register-logo" alt="logo" />
        <p>
          Edit <code>src/containers/Register.tsx</code> and save to reload.
        </p>
        <div className="input-container">
          <label htmlFor="username">
            Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} name="username" />
          </label>
          <label htmlFor="email">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" type="email" />
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
          <button onClick={handleRegister}>Submit</button>
        </div>
        <div className="links">
          <Link to={Routes.Home}>Back Home</Link>
          <Link to={Routes.Login}>Log In</Link>
        </div>
      </header>
    </div>
  );
};

export default Register;
