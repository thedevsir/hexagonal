import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { GuestRoute, UserRoute } from 'app/shared';
import {
    Home,
    Login,
    LoginModal,
    Register,
    RegisterModal,
    ForgotPassword,
    ForgotPasswordModal,
    ResetPassword,
    ResendEmail,
    ResendEmailModal,
    Verify,
    Settings,
} from 'app/screens';

import { Header } from './header';
import { SideNav } from './side-nav';
import { BackdropSwitch } from './backdrop-switch';

import { LayoutContext } from './layout-context';

import styles from './layout.module.scss';

export const Layout = () => (
    <LayoutContext.Provider>
        <LayoutContext.Consumer>
            {({ pseudoLocation, isSideNavOpen, setSideNavOpen, hasModal, closeModal }) => (
                <>
                    <main className={styles.main}>
                        <Switch location={pseudoLocation}>
                            <Route exact path="/" component={Home} />
                            <GuestRoute path="/login" component={Login} />
                            <GuestRoute path="/register" component={Register} />
                            <GuestRoute path="/forgot-password" component={ForgotPassword} />
                            <GuestRoute path="/resend-email" component={ResendEmail} />
                            <Route path="/verify/:key" component={Verify} />
                            <Route path="/reset-password/:key" component={ResetPassword} />
                            <UserRoute path="/settings" component={Settings} />
                        </Switch>
                    </main>
                    <Header onSideNavToggleClick={() => setSideNavOpen(true)} />
                    <SideNav show={isSideNavOpen} onBackdropClick={() => setSideNavOpen(false)} />
                    <BackdropSwitch show={hasModal} onBackdropClick={closeModal}>
                        <GuestRoute path="/login" render={props => <LoginModal {...props} onRequestClose={closeModal} />} />
                        <GuestRoute path="/register" render={props => <RegisterModal {...props} onRequestClose={closeModal} />} />
                        <GuestRoute
                            path="/forgot-password"
                            render={props => <ForgotPasswordModal {...props} onRequestClose={closeModal} />}
                        />
                        <GuestRoute path="/resend-email" render={props => <ResendEmailModal {...props} onRequestClose={closeModal} />} />
                    </BackdropSwitch>
                </>
            )}
        </LayoutContext.Consumer>
    </LayoutContext.Provider>
);
