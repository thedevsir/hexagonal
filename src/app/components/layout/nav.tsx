import React, { SFC } from 'react';
import { withRouter as router, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import { Chip, BackdropLink, AUTH, Auth } from 'app/shared';

import styles from './nav.module.scss';

export type NavProps = { auth?: Auth; className?: string } & RouteComponentProps<any>;

export const Nav = router(
    inject(AUTH)(
        observer<SFC<NavProps>>(({ auth, className, history, location }) => (
            <nav className={classNames(styles.nav, className)}>
                {auth!.isAuthenticated ? (
                    <Chip>
                        <img src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4" alt="avatar" className={styles.avatar} />
                        <span>{auth!.token!.payload!.user.username}</span>
                    </Chip>
                ) : (
                    (location.pathname !== '/login' || history.action === 'PUSH') && <BackdropLink to="/login">LOGIN</BackdropLink>
                )}
            </nav>
        ))
    )
);
