import React from 'react';

const Loading: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>Loading h1 component text</h1>
  </div>
);

Loading.propTypes = {};

export default Loading;
