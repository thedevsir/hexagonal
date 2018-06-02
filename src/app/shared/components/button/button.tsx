import React, { SFC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: SFC<ButtonProps> = ({ className, ...rest }) => <button className={classNames(styles.button, className)} {...rest} />;
