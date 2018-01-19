import * as React from "react";
import classnames from "classnames";

import * as Sidebar from "../Sidebar";

import styles from "./style.css";

type Props = {
  children: React.node
};

export default class App extends React.Component<Props> {
  state = {
    isSidebarOpen: false
  };

  handleOpenSidebar = () => this.setState({ isSidebarOpen: true });
  handleCloseSidebar = () => this.setState({ isSidebarOpen: false });

  render() {
    const { children } = this.props;
    const { isSidebarOpen } = this.state;

    const rootClassName = classnames(styles.root, {
      [styles.isSidebarOpen]: isSidebarOpen
    });

    return (
      <div className={rootClassName}>
        <div className={styles.main}>
          <button
            className={styles.closer}
            hidden={!isSidebarOpen}
            onClick={this.handleCloseSidebar}
          />
          <div className={styles.view}>
            <div className={styles.header}>
              <button
                className={styles.menuButton}
                onClick={this.handleOpenSidebar}
              />
              <div className={styles.title}>The Reactivation Baseline</div>
            </div>
            {children}
          </div>
        </div>
        <Sidebar.Host className={styles.sidebar}>
          <Sidebar.Section title="Area one">
            <Sidebar.LinkItem icon="home">Home</Sidebar.LinkItem>
            <Sidebar.LinkItem icon="features">Features</Sidebar.LinkItem>
          </Sidebar.Section>
          <Sidebar.Section title="Area two">
            <Sidebar.LinkItem icon="settings">Settings</Sidebar.LinkItem>
            <Sidebar.LinkItem icon="health">Health</Sidebar.LinkItem>
          </Sidebar.Section>
        </Sidebar.Host>
      </div>
    );
  }
}
