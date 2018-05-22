import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'app/components';

export const App = hot(module)(() => (
  <StrictMode>
    <Router>
      <Layout />
    </Router>
  </StrictMode>
));
