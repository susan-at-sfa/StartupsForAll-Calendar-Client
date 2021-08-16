import React, { FC, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from './constants/routes';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Ratings from './containers/Ratings';
import { useAppSelector } from './hooks';

const App: FC = () => {
  const token = useAppSelector(({ auth }) => auth.token);

  const routes = useMemo(() => {
    const jsx = [<Route path={Routes.Home} exact component={Home} />];
    if (!token) {
      jsx.push(
        <Route path={Routes.Login} exact component={Login} />,
        <Route path={Routes.Register} exact component={Register} />,
        <Redirect to={Routes.Home} />,
      );
    } else {
      jsx.push(
        <Route path={Routes.Ratings} exact component={Ratings} />,
        <Redirect to={Routes.Ratings} />,
      );
    }
    return jsx;
  }, [token]);

  return <Switch>{routes}</Switch>;
};

export default App;
