import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'app/screens';

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
                        </Switch>
                    </main>
                    <Header onSideNavToggleClick={() => setSideNavOpen(true)} />
                    <SideNav show={isSideNavOpen} onBackdropClick={() => setSideNavOpen(false)} />
                    <BackdropSwitch show={hasModal} onBackdropClick={closeModal} />
                </>
            )}
        </LayoutContext.Consumer>
    </LayoutContext.Provider>
);
