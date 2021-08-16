import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Routes } from '../../constants/routes';
import './index.css';

const Home: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Counter /> */}
        <p>
          Edit <code>src/containers/Home.tsx</code> and save to reload.
        </p>
        <div className="links">
          <Link to={Routes.Login}>Log In</Link>
          <Link to={Routes.Register}>Register</Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
