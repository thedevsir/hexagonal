import React, { SFC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { AUTH, Auth } from 'app/shared';

export type GuestRouteProps = { auth?: Auth } & RouteProps;

export const GuestRoute = inject(AUTH)(
    observer<SFC<GuestRouteProps>>(({ auth, ...rest }) => (auth!.isAuthenticated ? <Redirect to="/" /> : <Route {...rest} />))
);
