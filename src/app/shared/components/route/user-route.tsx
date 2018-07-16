import React, { SFC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { AUTH, Auth } from 'app/shared';

export type UserRouteProps = { auth?: Auth } & RouteProps;

export const UserRoute = inject(AUTH)(
    observer<SFC<UserRouteProps>>(({ auth, ...rest }) => (auth!.isAuthenticated ? <Route {...rest} /> : <Redirect to="/" />))
);
