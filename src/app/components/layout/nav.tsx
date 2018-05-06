import React, { SFC, DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Chip } from 'app/shared';

import styles from './nav.module.scss';

export type NavProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const Nav: SFC<NavProps> = ({ className, ...rest }) => (
  <nav className={classNames(styles.nav, className)} {...rest}>
    <Chip>
      <img
        src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4"
        alt="avatar"
        className={styles.avatar}
      />
      <span>freshmanlimited</span>
    </Chip>
  </nav>
);
