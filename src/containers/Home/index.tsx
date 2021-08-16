import React from 'react';
import Loading from '../../components/Loading';

// Lazily load routes and code split with webpack
const LazyHomePage = React.lazy(() => import(/* webpackChunkName: "HomePage" */ './Home'));

const HomePage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyHomePage />
  </React.Suspense>
);

export default HomePage;
