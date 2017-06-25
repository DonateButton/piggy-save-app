import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingAccounts = () => (
  <div>
    <div>Loading your accounts...</div>
    <CircularProgress />
  </div>
);

export default LoadingAccounts;