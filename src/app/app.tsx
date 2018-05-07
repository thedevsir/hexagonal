import React, { Component, StrictMode } from 'react';
import { hot } from 'react-hot-loader';

import { Layout } from 'app/components';

import styles from './app.module.scss';

@hot(module)
export class App extends Component {
  render() {
    return (
      <StrictMode>
        <Layout>
          <p className={styles.intro}>
            To get started, edit <code>src/app.tsx</code> and save to reload.
          </p>
        </Layout>
      </StrictMode>
    );
  }
}
