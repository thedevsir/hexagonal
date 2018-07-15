import React, { SFC } from 'react';
import classNames from 'classnames';

import styles from './avatar.module.scss';

export type AvatarProps = { size?: number } & JSX.IntrinsicElements['img'];

export const Avatar: SFC<AvatarProps> = ({ size = 24, className, ...rest }) => (
    <div className={classNames(styles.avatar, className)} style={{ width: size, height: size }}>
        <img className={styles.image} {...rest} />
    </div>
);
