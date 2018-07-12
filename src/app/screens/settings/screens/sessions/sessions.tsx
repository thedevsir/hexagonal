import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';

import { Auth, AUTH } from 'app/shared';

import { SessionCard, StatusModifier } from './components';

import styles from './sessions.module.scss';
import { SessionsApi } from './services';

export type Session = {
    id: string;
    ip: string;
    browser: string;
    os: string;
    createdAt: Date;
    lastActivityAt: Date;
};

export type SessionsInnerProps = {
    auth?: Auth;
};

export type SessionsInnerState = {
    sessions?: Session[];
};

export class SessionsInner extends PureComponent<SessionsInnerProps, SessionsInnerState> {
    state: SessionsInnerState = {};

    async componentDidMount() {
        const { data } = await SessionsApi.fetchSessions();

        const sessions = data.map<Session>(({ timeCreated, lastActive, ...rest }) => ({
            createdAt: new Date(timeCreated),
            lastActivityAt: new Date(lastActive),
            ...rest,
        }));

        this.setState({ sessions });
    }

    render() {
        const { auth } = this.props;
        const { sessions } = this.state;

        if (!sessions) {
            return null;
        }

        return (
            <div className={styles.sessions}>
                {sessions.map(session => (
                    <SessionCard
                        key={session.id}
                        status={StatusModifier.Online}
                        removable={session.id !== auth!.token!.payload!.session.id}
                        {...session}
                        onRemoveSession={this.handleRemoveSession}
                    />
                ))}
            </div>
        );
    }

    handleRemoveSession = async (id: Session['id']) => {
        await SessionsApi.deleteSession(id);
        this.setState(({ sessions }) => ({ sessions: sessions!.filter(session => session.id !== id) }));
    };
}

export const Sessions = inject(AUTH)(SessionsInner);
