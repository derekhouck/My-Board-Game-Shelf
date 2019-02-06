import React from 'react';
import requiresLogin from './requires-login';

import Games from './games';

export function Dashboard(props) {
  return (
    <section className="dashboard">
      <h1>Your Shelf</h1>
      <Games />
    </section>
  );
}

export default requiresLogin()(Dashboard);