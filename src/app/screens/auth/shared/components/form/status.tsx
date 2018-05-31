import React, { SFC, DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './status.module.scss';

export type StatusProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export const Status: SFC<StatusProps> = ({ className, ...rest }) => <p className={classNames(styles.status, className)} {...rest} />;
