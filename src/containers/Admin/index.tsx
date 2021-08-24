import React from 'react';
import Loading from '../../components/Loading';

// Lazily load routes and code split with webpack
const LazyAdminPage = React.lazy(() => import(/* webpackChunkName: "AdminPage" */ './Admin'));

const AdminPage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyAdminPage />
  </React.Suspense>
);

export default AdminPage;
