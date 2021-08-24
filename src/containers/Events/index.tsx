import React from 'react';
import Loading from '../../components/Loading';

// Lazily load routes and code split with webpack
const LazyEventsPage = React.lazy(() => import(/* webpackChunkName: "EventsPage" */ './Events'));

const EventsPage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyEventsPage />
  </React.Suspense>
);

export default EventsPage;
