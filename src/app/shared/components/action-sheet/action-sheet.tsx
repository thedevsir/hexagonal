import React, { Children, isValidElement } from 'react';
import classNames from 'classnames';

import { backdrop } from '../backdrop';

import styles from './action-sheet.module.scss';

export const ActionSheet = backdrop(({ children }) => (
  <ul className={styles.container}>
    {Children.map(
      children,
      child =>
        isValidElement<{ className: string }>(child) ? (
          <li>
            <child.type
              {...child.props}
              className={classNames(styles.item, child.props.className)}
            />
          </li>
        ) : null
    )}
  </ul>
));
