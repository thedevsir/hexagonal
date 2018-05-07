import React from 'react';

import { backdrop } from 'app/components';

import { Nav } from './nav';

import styles from './side-nav.module.scss';

export const SideNav = backdrop(() => (
  <div className={styles.sideNav}>
    <Nav className={styles.nav} />
  </div>
));
