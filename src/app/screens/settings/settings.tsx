import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Tabs, Tab } from 'app/screens/settings/components';
import { Sessions, Profile } from 'app/screens/settings/screens';

export type SettingsProps = RouteComponentProps<undefined>;

export const Settings: SFC<SettingsProps> = ({ match }) => (
    <Tabs>
        <Tab default to={`${match.path}/profile`} label="Profile Settings" component={Profile} />
        <Tab to={`${match.path}/sessions`} label="Sessions Management" component={Sessions} />
    </Tabs>
);
