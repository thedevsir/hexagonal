import React, { ReactNode, SFC } from 'react';
import classNames from 'classnames';

import styles from './modal.module.scss';

export type ModalProps = {
    flat?: boolean;
    title: ReactNode;
    footer?: ReactNode;
    onRequestClose?: () => void;
};

export const Modal: SFC<ModalProps> = ({ flat, title, children, footer, onRequestClose }) => (
    <div className={classNames(styles.container, flat && styles.flat)}>
        <div className={styles.header}>
            {onRequestClose && <button className={styles.closeButton} onClick={onRequestClose} />}
            <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
    </div>
);
