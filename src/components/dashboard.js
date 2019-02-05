import React from 'react';
import requiresLogin from './requires-login';

import Users from './users';

export function Dashboard(props) {
  return (
    <section className="dashboard">
      <h2>Your Shelf</h2>
      <Users />
    </section>
  );
}

export default requiresLogin()(Dashboard);