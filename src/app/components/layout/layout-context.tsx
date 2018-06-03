import React, { PureComponent, createContext } from 'react';
import { withRouter as router, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';

// tslint:disable-next-line:no-any
export type LayoutProviderProps = RouteComponentProps<any>;

export type LayoutProviderState = {
    hasModal: boolean;
    isSideNavOpen: boolean;
    pseudoLocation?: Location;
    setSideNavOpen: (open: boolean) => void;
    closeModal: () => void;
};

export type LayoutContextValues = LayoutProviderState;

// tslint:disable-next-line:no-any
const { Provider, Consumer } = createContext<LayoutContextValues>({} as any);

const LayoutProvider = router(
    class extends PureComponent<LayoutProviderProps, LayoutProviderState> {
        state: LayoutProviderState = {
            hasModal: false,
            isSideNavOpen: false,
            setSideNavOpen: open => this.setState({ isSideNavOpen: open }),
            closeModal: () => {
                const { pseudoLocation } = this.state;

                this.props.history.push({
                    pathname: '/',
                    ...pseudoLocation,
                    state: {
                        ...(pseudoLocation && pseudoLocation.state),
                        backdrop: false,
                    },
                });
            },
        };

        static getDerivedStateFromProps(
            { location }: LayoutProviderProps,
            { pseudoLocation }: LayoutProviderState
        ): Partial<LayoutProviderState> | null {
            if (pseudoLocation && location.state && location.state.backdrop) {
                return {
                    hasModal: true,
                    isSideNavOpen: false,
                };
            }

            return {
                hasModal: false,
                pseudoLocation: location,
            };
        }

        render() {
            return <Provider value={this.state}>{this.props.children}</Provider>;
        }
    }
);

export const LayoutContext = { Provider: LayoutProvider, Consumer };
