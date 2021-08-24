import React from "react";
import Loading from "../../components/Loading";

// Lazily load routes and code split with webpack
const LazyAddPage = React.lazy(
  () => import(/* webpackChunkName: "AddPage" */ "./Add")
);

const AddPage = () => (
  <React.Suspense fallback={<Loading />}>
    <LazyAddPage />
  </React.Suspense>
);

export default AddPage;
