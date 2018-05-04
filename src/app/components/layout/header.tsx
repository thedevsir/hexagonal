import React, { SFC, ComponentType } from 'react';

import { Nav } from './nav';

import styles from './header.module.scss';
import logo from 'assets/logo.svg';

export type HeaderProps = {
  sideNavToggle: ComponentType;
};

export const Header: SFC<HeaderProps> = ({ sideNavToggle: SideNavToggle }) => (
  <header className={styles.header}>
    <img src={logo} alt="logo" className={styles.logo} />
    <Nav className={styles.nav} />
    <SideNavToggle />
  </header>
);
