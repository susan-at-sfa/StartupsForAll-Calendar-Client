import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Routes } from "../../constants/routes";
import "./index.css";

const Add: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Add.tsx</h1>
        <div className="links">
          <Link to={Routes.Events}>Back To Events</Link>
          <Link to={Routes.Add}>Add</Link>
        </div>
      </header>
    </div>
  );
};

export default Add;
