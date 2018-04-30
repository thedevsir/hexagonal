import React, { Component, StrictMode } from 'react';
import { hot } from 'react-hot-loader';

import styles from './app.module.scss';
// tslint:disable-next-line:no-submodule-imports
import logo from 'assets/logo.svg';

@hot(module)
export class App extends Component {
  render() {
    return (
      <StrictMode>
        <div className={styles.app}>
          <header className={styles.header}>
            <img src={logo} className={styles.logo} alt="logo" />
            <h1 className={styles.title}>Welcome to React</h1>
          </header>
          <p className={styles.intro}>
            To get started, edit <code>src/app.tsx</code> and save to reload.
          </p>
        </div>
      </StrictMode>
    );
  }
}
