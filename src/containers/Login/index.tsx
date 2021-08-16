import React from 'react';
import Loading from '../../components/Loading';

// Lazily load routes and code split with webpack
const LazyLoginPage = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ './Login'));

const LoginPage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyLoginPage />
  </React.Suspense>
);

export default LoginPage;
