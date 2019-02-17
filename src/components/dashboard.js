import React from 'react';
import requiresLogin from './requires-login';
import styles from './dashboard.module.css';

import Games from './games/games';

export function Dashboard(props) {
  return (
    <section className={styles.dashboard}>
      <h1>Your Shelf</h1>
      <Games />
    </section>
  );
}

export default requiresLogin()(Dashboard);