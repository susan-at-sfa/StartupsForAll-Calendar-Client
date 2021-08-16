import React from 'react';
import Loading from '../../components/Loading';

// Lazily load routes and code split with webpack
const LazyRatingsPage = React.lazy(() => import(/* webpackChunkName: "RatingsPage" */ './Ratings'));

const RatingsPage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyRatingsPage />
  </React.Suspense>
);

export default RatingsPage;
