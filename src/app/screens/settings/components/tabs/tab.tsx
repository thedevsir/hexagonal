import React, { SFC, ReactNode } from 'react';
import { NavLink, RouteProps, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './tab.module.scss';

export type TabProps = { label: ReactNode; component: RouteProps['component']; default?: boolean } & NavLinkProps;

export const Tab: SFC<TabProps> = ({ label, className, activeClassName, component, ...rest }) => (
    <NavLink className={classNames(styles.tab, className)} activeClassName={classNames(styles.active, activeClassName)} {...rest}>
        {label}
    </NavLink>
);
