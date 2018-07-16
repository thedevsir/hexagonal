import React, { SFC, ComponentType } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './item.module.scss';

export type ItemProps = { icon?: ComponentType<any> } & NavLinkProps;

export const Item: SFC<ItemProps> = ({ icon: Icon, activeClassName, children, ...rest }) => {
    return (
        <li className={styles.container}>
            <NavLink className={styles.item} activeClassName={classNames(styles.active)} {...rest}>
                {Icon && <Icon className={styles.icon} />}
                <span>{children}</span>
            </NavLink>
        </li>
    );
};
