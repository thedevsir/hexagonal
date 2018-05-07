import React, { PureComponent } from 'react';

import { Header } from './header';
import { SideNav } from './side-nav';

import styles from './layout.module.scss';

export type LayoutState = {
  showSideNav: boolean;
};

export class Layout extends PureComponent<{}, LayoutState> {
  state: LayoutState = {
    showSideNav: false,
  };

  sideNavToggle = () => (
    <button
      className={styles.sideNavToggle}
      onClick={() =>
        this.setState({
          showSideNav: true,
        })
      }
    >
      <span className={styles.sideNavToggleMiddleLine} />
    </button>
  );

  render() {
    return (
      <div className="layout">
        <Header sideNavToggle={this.sideNavToggle} />
        <main>{this.props.children}</main>
        <SideNav
          show={this.state.showSideNav}
          onBackdropClick={() => this.setState({ showSideNav: false })}
        />
      </div>
    );
  }
}
