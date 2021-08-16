import React from 'react';
import Loading from '../../components/Loading';

// Lazily load routes and code split with webpack
const LazyRegisterPage = React.lazy(() => import(/* webpackChunkName: "RegisterPage" */ './Register'));

const RegisterPage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyRegisterPage />
  </React.Suspense>
);

export default RegisterPage;
