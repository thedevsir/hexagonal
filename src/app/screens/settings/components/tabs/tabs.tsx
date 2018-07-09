import React, { Children, isValidElement } from 'react';
import { withRouter as router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { TabProps } from './tab';

import styles from './tabs.module.scss';

export type TabsProps = RouteComponentProps<undefined>;

export const Tabs = router<TabsProps>(({ children, match }) => {
    const childrenProps = Children.map(children, child => (isValidElement(child) ? child.props : undefined)).filter(
        (props): props is TabProps => !!props
    );

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>{children}</div>
            <Switch>
                {childrenProps
                    .map(({ component, to }) => ({
                        component,
                        path: typeof to === 'string' ? to : (to.pathname as string),
                    }))
                    .map(props => <Route key={props.path} {...props} />)}
                <Redirect from={match.path} to={(childrenProps.find(props => !!props.default) || childrenProps[0]).to} />
            </Switch>
        </div>
    );
});
