import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import { Nav } from './nav';

import styles from './header.module.scss';
import logo from 'assets/logo.svg';

export type HeaderProps = {
    onSideNavToggleClick: () => void;
};

export const Header: SFC<HeaderProps> = ({ onSideNavToggleClick }) => (
    <header className={styles.header}>
        <Link to="/">
            <img src={logo} alt="logo" className={styles.logo} />
        </Link>
        <Nav className={styles.nav} />
        <button className={styles.sideNavToggle} onClick={onSideNavToggleClick}>
            <span className={styles.sideNavToggleMiddleLine} />
        </button>
    </header>
);
