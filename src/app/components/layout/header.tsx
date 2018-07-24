import React, { SFC } from 'react';
import { Link, withRouter as router, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Popover, Position, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

import { AUTH, Auth, Chip, Button, BackdropLink } from 'app/shared';

import { LayoutContext } from './layout-context';

import styles from './header.module.scss';
import logo from 'assets/logo.svg';

export type HeaderInnerProps = {
    onSideNavToggleClick: () => void;
    auth?: Auth;
} & RouteComponentProps<undefined>;

const HeaderInner: SFC<HeaderInnerProps> = ({ auth, location, onSideNavToggleClick }) => {
    const chipMenu = (
        <Menu>
            <Link to="/settings">
                <MenuItem icon="cog" text="Settings" />
            </Link>
            <MenuDivider />
            <MenuItem icon="log-out" text="Logout" onClick={() => auth!.logout()} />
        </Menu>
    );

    return (
        <header className={styles.header}>
            <Link to="/">
                <img src={logo} alt="logo" className={styles.logo} />
            </Link>
            <nav className={styles.nav}>
                {auth!.isAuthenticated ? (
                    <Popover content={chipMenu} position={Position.TOP_RIGHT}>
                        <Chip>
                            <img src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4" alt="avatar" className={styles.avatar} />
                            <span>{auth!.token!.payload!.user.username}</span>
                        </Chip>
                    </Popover>
                ) : (
                    <LayoutContext.Consumer>
                        {({ hasModal }) =>
                            (location.pathname !== '/login' || hasModal) && (
                                <Button as={BackdropLink} className={styles.loginButton} to="/login">
                                    Login
                                </Button>
                            )
                        }
                    </LayoutContext.Consumer>
                )}
            </nav>
            <button className={styles.sideNavToggle} onClick={onSideNavToggleClick}>
                <span className={styles.sideNavToggleMiddleLine} />
            </button>
        </header>
    );
};

export const Header = router(inject(AUTH)(observer(HeaderInner)));
