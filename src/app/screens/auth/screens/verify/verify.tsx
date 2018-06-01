import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { AuthApi } from 'app/shared';

import styles from './verify.module.scss';

export type VerifyProps = RouteComponentProps<{ key: string }>;

export type VerifyState = { pending: boolean };

export class Verify extends PureComponent<VerifyProps, VerifyState> {
    state: VerifyState = {
        pending: true,
    };

    async componentDidMount() {
        await AuthApi.verify({ key: this.props.match.params.key });

        this.setState({ pending: false });
        setTimeout(() => this.props.history.replace('/login'), 1000);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.state.pending ? 'Please wait ...' : 'Your account has been activated successfully.'}
            </div>
        );
    }
}
