import React, { SFC } from 'react';

import { Nav } from './nav';

import styles from './header.module.scss';
import logo from 'assets/logo.svg';

export type HeaderProps = {
    onSideNavToggleClick: () => void;
};

export const Header: SFC<HeaderProps> = ({ onSideNavToggleClick }) => (
    <header className={styles.header}>
        <img src={logo} alt="logo" className={styles.logo} />
        <Nav className={styles.nav} />
        <button className={styles.sideNavToggle} onClick={onSideNavToggleClick}>
            <span className={styles.sideNavToggleMiddleLine} />
        </button>
    </header>
);
