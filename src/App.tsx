import React, { FC, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Routes } from "./constants/routes";
import Events from "./containers/Events";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import Add from "./containers/Add";
import { useAppSelector } from "./hooks";

const App: FC = () => {
  const token = useAppSelector(({ auth }) => auth.token);
  // const username = useAppSelector(({ user }) => user.username);

  const routes = useMemo(() => {
    const jsx = [
      <Route key={"Events"} path={Routes.Events} exact component={Events} />,
      <Route key={"Add"} path={Routes.Add} exact component={Add} />,
    ];
    if (!token) {
      jsx.push(
        <Route key={"Login"} path={Routes.Login} exact component={Login} />,
        <Redirect key={"RedirectEvents"} to={Routes.Events} />
      );
    } else {
      jsx.push(
        <Route key={"Admin"} path={Routes.Admin} exact component={Admin} />,
        <Redirect key={"RedirectEvents"} to={Routes.Events} />
      );
    }
    return jsx;
  }, [token]);

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  );
};

export default App;
