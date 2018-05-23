import React, { ComponentType, SFC } from 'react';
import { Link } from 'react-router-dom';

import { Nav } from './nav';

import styles from './header.module.scss';
import logo from 'assets/logo.svg';

export type HeaderProps = {
  sideNavToggle: ComponentType;
};

export const Header: SFC<HeaderProps> = ({ sideNavToggle: SideNavToggle }) => (
  <header className={styles.header}>
    <Link to="/">
      <img src={logo} alt="logo" className={styles.logo} />
    </Link>
    <Nav className={styles.nav} />
    <SideNavToggle />
  </header>
);
