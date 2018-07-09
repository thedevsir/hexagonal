import React, { SFC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export enum ButtonModifier {
    default = 'default',
    primary = 'primary',
}

export type ButtonProps = {
    modifier?: ButtonModifier;
    large?: boolean;
    block?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: SFC<ButtonProps> = ({ modifier = ButtonModifier.default, large, block, className, ...rest }) => (
    <button className={classNames(styles.button, styles[modifier], large && styles.large, block && styles.block, className)} {...rest} />
);
