import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { Item } from './item';
import { Divider } from './divider';

import styles from './menu.module.scss';

export type MenuProps = JSX.IntrinsicElements['ul'];

export class Menu extends PureComponent<MenuProps> {
    static Item = Item;
    static Divider = Divider;

    render() {
        const { className, children, ...rest } = this.props;

        return (
            <ul className={classNames(styles.menu, className)} {...rest}>
                {children}
            </ul>
        );
    }
}
