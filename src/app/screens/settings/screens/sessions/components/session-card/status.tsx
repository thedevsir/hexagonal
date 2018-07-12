import React, { SFC } from 'react';
import classNames from 'classnames';

import styles from './status.module.scss';

export enum StatusModifier {
    Online,
    Offline,
}

export type StatusProps = {
    modifier: StatusModifier;
} & JSX.IntrinsicElements['div'];

export const Status: SFC<StatusProps> = ({ modifier, className, ...rest }) => (
    <div className={classNames(styles.status, modifier === StatusModifier.Online ? styles.online : styles.offline, className)} {...rest} />
);
