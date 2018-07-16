import React, { SFC } from 'react';

import { shortDateFormat } from 'utils';
import { Button, ButtonModifier } from 'app/shared';

import { Status, StatusModifier } from './status';

import styles from './session-card.module.scss';

export type SessionCardProps = {
    id: string;
    ip: string;
    browser: string;
    os: string;
    createdAt: Date;
    lastActivityAt: Date;
    status: StatusModifier;
    removable?: boolean;
    onRemoveSession?: (id: string) => void;
};

export const SessionCard: SFC<SessionCardProps> = ({
    id,
    ip,
    browser,
    os,
    createdAt,
    lastActivityAt,
    status,
    removable,
    onRemoveSession,
}) => {
    const handleRemoveButtonClick = () => onRemoveSession && onRemoveSession(id);

    return (
        <div className={styles.session}>
            <Status modifier={status} className={styles.status} />
            <p className={styles.ip}>{ip}</p>
            <p className={styles.browserAndOs}>
                <span className={styles.browser}>{browser}</span> {os}
            </p>
            <p>Creation Date: {shortDateFormat(createdAt)}</p>
            <p className={styles.lastActivityAt}>Last Activity Date: {shortDateFormat(lastActivityAt)}</p>
            {removable && (
                <Button modifier={ButtonModifier.Primary} className={styles.button} onClick={handleRemoveButtonClick}>
                    Remove Session
                </Button>
            )}
        </div>
    );
};
