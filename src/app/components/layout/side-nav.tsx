import React, { SFC } from 'react';
import { Link, withRouter as router, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withState, compose } from 'recompose';

import { AUTH, Auth, Chip, Button, BackdropLink, ActionSheet, backdrop, OwnBackdropProps } from 'app/shared';

import { LayoutContext } from './layout-context';

import styles from './side-nav.module.scss';

export type SideNavInnerProps = {
    auth: Auth;
    isActionSheetOpen: boolean;
    setIsActionSheetOpen: (value: boolean) => void;
} & RouteComponentProps<undefined>;

export const SideNavInner: SFC<SideNavInnerProps> = ({ auth, isActionSheetOpen, setIsActionSheetOpen }) => (
    <>
        <div className={styles.sideNav}>
            <nav className={styles.nav}>
                {auth.isAuthenticated ? (
                    <Chip onClick={() => setIsActionSheetOpen(true)}>
                        <img src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4" alt="avatar" className={styles.avatar} />
                        <span>{auth.token!.payload!.user.username}</span>
                    </Chip>
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
        </div>
        <ActionSheet
            light
            show={isActionSheetOpen}
            onBackdropClick={() => setIsActionSheetOpen(false)}
            onItemClick={() => setIsActionSheetOpen(false)}
        >
            <Link to="/settings">Settings</Link>
            <a onClick={() => auth.logout()}>Logout</a>
        </ActionSheet>
    </>
);

export type SideNavProps = OwnBackdropProps;

export const SideNav = compose<SideNavInnerProps, SideNavProps>(
    router,
    inject(AUTH),
    observer,
    backdrop,
    withState('isActionSheetOpen', 'setIsActionSheetOpen', false)
)(SideNavInner);
