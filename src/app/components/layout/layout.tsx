import React, { PureComponent } from 'react';
import { withRouter as router, Switch, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';

import { GuestRoute } from 'app/shared';
import { Login, LoginModal, Register, RegisterModal } from 'app/screens';

import { Header } from './header';
import { SideNav } from './side-nav';
import { BackdropSwitch } from './backdrop-switch';

import styles from './layout.module.scss';

export type LayoutProps = RouteComponentProps<any>;

export type LayoutState = {
    showSideNav: boolean;
    prevLocation?: Location;
};

export const Layout = router(
    class extends PureComponent<LayoutProps, LayoutState> {
        static displayName = 'Layout';

        state: LayoutState = {
            showSideNav: false,
        };

        sideNavToggle = () => (
            <button
                className={styles.sideNavToggle}
                onClick={() =>
                    this.setState({
                        showSideNav: true,
                    })
                }
            >
                <span className={styles.sideNavToggleMiddleLine} />
            </button>
        );

        static getDerivedStateFromProps({ location }: LayoutProps, { prevLocation }: LayoutState): Partial<LayoutState> | null {
            if (prevLocation && location.state && location.state.backdrop) {
                return null;
            }

            return {
                prevLocation: location,
            };
        }

        render() {
            const { location } = this.props;
            const { showSideNav, prevLocation } = this.state;

            return (
                <>
                    <Header sideNavToggle={this.sideNavToggle} />
                    <main>
                        <Switch location={prevLocation ? prevLocation : location}>
                            <GuestRoute path="/login" component={Login} />
                            <GuestRoute path="/register" component={Register} />
                        </Switch>
                    </main>
                    <SideNav show={showSideNav} onBackdropClick={() => this.setState({ showSideNav: false })} />
                    <BackdropSwitch
                        show={location.state && location.state.backdrop && prevLocation !== location}
                        onBackdropClick={this._handleModalClose}
                    >
                        <GuestRoute path="/login" render={props => <LoginModal {...props} onRequestClose={this._handleModalClose} />} />
                        <GuestRoute
                            path="/register"
                            render={props => <RegisterModal {...props} onRequestClose={this._handleModalClose} />}
                        />
                    </BackdropSwitch>
                </>
            );
        }

        private _handleModalClose = () => {
            const { prevLocation } = this.state;

            this.props.history.push({
                pathname: '/',
                ...prevLocation,
                state: {
                    ...(prevLocation && prevLocation.state),
                    backdrop: false,
                },
            });
        };
    }
);
