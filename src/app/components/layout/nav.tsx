import React, { SFC } from 'react';
import { withRouter as router, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import { AUTH, Auth, Chip, Button, BackdropLink } from 'app/shared';

import { LayoutContext } from './layout-context';

import styles from './nav.module.scss';

export type NavProps = { auth?: Auth; className?: string } & RouteComponentProps<any>;

export const Nav = router(
    inject(AUTH)(
        observer<SFC<NavProps>>(({ auth, className, location }) => (
            <nav className={classNames(styles.nav, className)}>
                {auth!.isAuthenticated ? (
                    <>
                        <Chip>
                            <img src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4" alt="avatar" className={styles.avatar} />
                            <span>{auth!.token!.payload!.user.username}</span>
                        </Chip>
                        <Button onClick={() => auth!.logout()}>LOG OUT</Button>
                    </>
                ) : (
                    <LayoutContext.Consumer>
                        {({ hasModal }) => (location.pathname !== '/login' || hasModal) && <BackdropLink to="/login">LOGIN</BackdropLink>}
                    </LayoutContext.Consumer>
                )}
            </nav>
        ))
    )
);
