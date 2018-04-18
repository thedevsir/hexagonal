import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import styles from './app.module.scss';
import logo from './logo.svg';

@hot(module)
export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>Welcome to React</h1>
        </header>
        <p className={styles.intro}>
          To get started, edit <code>src/app.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
