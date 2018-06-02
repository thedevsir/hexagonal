import React, { SFC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export type ButtonProps = {
    large?: boolean;
    block?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: SFC<ButtonProps> = ({ large, block, className, ...rest }) => (
    <button className={classNames(styles.button, large && styles.large, block && styles.block, className)} {...rest} />
);
