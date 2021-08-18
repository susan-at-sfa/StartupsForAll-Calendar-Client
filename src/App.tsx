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
    const jsx = [<Route key={'Home'} path={Routes.Home} exact component={Home} />];
    if (!token) {
      jsx.push(
        <Route key={'Login'} path={Routes.Login} exact component={Login} />,
        <Route key={'Register'} path={Routes.Register} exact component={Register} />,
        <Redirect key={'RedirectHome'} to={Routes.Home} />,
      );
    } else {
      jsx.push(
        <Route key={'Ratings'} path={Routes.Ratings} exact component={Ratings} />,
        <Redirect key={'Ratings'} to={Routes.Ratings} />,
      );
    }
    return jsx;
  }, [token]);

  return <Switch>{routes}</Switch>;
};

export default App;
