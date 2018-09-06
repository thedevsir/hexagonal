import React, { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { configure } from 'mobx';
import axios from 'axios';

import { AUTH, Auth } from 'app/shared';
import { Layout } from 'app/components';

configure({
    enforceActions: true,
});

const auth = new Auth();

const stores = {
    [AUTH]: auth,
};

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(config => {
    if (auth.isAuthenticated) {
        config.headers = {
            ...config.headers,
            Authorization: `bearer ${auth.token!}`,
        };
    }

    return config;
});

export const App = hot(module)(() => (
    <StrictMode>
        <Router>
            <Provider {...stores}>
                <Layout />
            </Provider>
        </Router>
    </StrictMode>
));
