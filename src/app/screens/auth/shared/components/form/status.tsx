import React, { SFC, DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './status.module.scss';

export enum StatusModifier {
    success,
    error,
}

export type StatusProps = {
    message?: string;
    modifier?: StatusModifier;
} & DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export const Status: SFC<StatusProps> = ({ modifier = StatusModifier.error, className, message, children, ...rest }) => (
    <p className={classNames(styles.status, modifier === StatusModifier.success ? styles.success : styles.error, className)} {...rest}>
        {message || children}
    </p>
);
