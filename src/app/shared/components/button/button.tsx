import React, { SFC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export const enum ButtonModifier {
    Default = 'default',
    Primary = 'primary',
}

export type ButtonProps = {
    modifier?: ButtonModifier;
    large?: boolean;
    block?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: SFC<ButtonProps> = ({ modifier = ButtonModifier.Default, large, block, className, ...rest }) => (
    <button className={classNames(styles.button, styles[modifier], large && styles.large, block && styles.block, className)} {...rest} />
);
