import React, { SFC } from 'react';
import classNames from 'classnames';

import styles from './divider.module.scss';

export type DividerProps = JSX.IntrinsicElements['div'];

export const Divider: SFC<DividerProps> = ({ className }) => <li className={classNames(styles.divider, className)} />;
