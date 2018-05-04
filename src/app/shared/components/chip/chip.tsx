import React, { SFC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

import styles from './chip.module.scss';

export type ChipProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Chip: SFC<ChipProps> = ({ className, children, ...rest }) => (
  <button className={`${styles.chip} ${className}`} {...rest}>
    {children}
  </button>
);
