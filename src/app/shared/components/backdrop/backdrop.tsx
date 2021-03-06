import React, { ComponentType, MouseEventHandler, SFC } from 'react';
import classNames from 'classnames';

import { getHocDisplayName } from 'utils';

import styles from './backdrop.module.scss';

export type InjectedBackdropProps = {};

export type OwnBackdropProps = {
    show: boolean;
    onBackdropClick?: MouseEventHandler<HTMLElement>;
    light?: boolean;
};

export const backdrop = <P extends {}>(WrappedComponent: ComponentType<P>) => {
    type BackdropProps = Omit<P, keyof InjectedBackdropProps> & OwnBackdropProps;

    const Backdrop: SFC<BackdropProps> = ({
        show,
        onBackdropClick,
        light,
        // ignored because of typescript issue on generic types spread operation
        // https://github.com/Microsoft/TypeScript/issues/10727
        // @ts-ignore
        ...props
    }) => {
        return show ? (
            <div className={styles.container}>
                <div className={classNames(styles.backdrop, light && styles.light)} onClick={onBackdropClick} />
                <WrappedComponent {...props} />
            </div>
        ) : null;
    };

    Backdrop.displayName = getHocDisplayName(Backdrop, WrappedComponent);

    return Backdrop;
};
