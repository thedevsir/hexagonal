import React, { Children, isValidElement, SFC, MouseEvent, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { backdrop } from '../backdrop';

import styles from './action-sheet.module.scss';

export type ActionSheetInnerProps = {
    onItemClick?: MouseEventHandler<any>;
};

const ActionSheetInner: SFC<ActionSheetInnerProps> = ({ children, onItemClick }) => (
    <ul className={styles.container}>
        {Children.map(
            children,
            child =>
                isValidElement<{ className: string; onClick?: MouseEventHandler<any> }>(child) ? (
                    <li>
                        <child.type
                            {...child.props}
                            className={classNames(styles.item, child.props.className)}
                            onClick={(event: MouseEvent<any>) => {
                                onItemClick && onItemClick(event);
                                child.props.onClick && child.props.onClick(event);
                            }}
                        />
                    </li>
                ) : null
        )}
    </ul>
);

export const ActionSheet = backdrop(ActionSheetInner);
