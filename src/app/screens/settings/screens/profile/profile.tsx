import React, { SFC } from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { TiCog, TiKey } from 'react-icons/lib/ti';

import { Menu } from './components';
import { Account, Password } from './screens';

import styles from './profile.module.scss';

export type ProfileProps = RouteComponentProps<undefined>;

export const Profile: SFC<ProfileProps> = ({ match }) => (
    <div className={styles.profile}>
        <Menu className={styles.menu}>
            <Menu.Item icon={TiCog} to={`${match.path}/account`}>
                Edit Account
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={TiKey} to={`${match.path}/password`}>
                Password Management
            </Menu.Item>
        </Menu>
        <div className={styles.panel}>
            <Switch>
                <Route path={`${match.path}/account`} component={Account} />
                <Route path={`${match.path}/password`} component={Password} />
                <Redirect exact from={match.path} to={`${match.path}/account`} />
            </Switch>
        </div>
    </div>
);
