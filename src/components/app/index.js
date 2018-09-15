import React from "react";
import classnames from "classnames";

import * as Sidebar from "../sidebar";

import "./style.css";

type PropsType = {
  children: React.node
};

export default class App extends React.Component<PropsType> {
  state = {
    isSidebarOpen: false
  };

  handleOpenSidebar = () => this.setState({ isSidebarOpen: true });

  handleCloseSidebar = () => this.setState({ isSidebarOpen: false });

  render() {
    const { children } = this.props;
    const { isSidebarOpen } = this.state;

    return (
      <div styleName={classnames("root", { isSidebarOpen })}>
        <div styleName="main">
          <button
            styleName="closer"
            type="button"
            hidden={!isSidebarOpen}
            onClick={this.handleCloseSidebar}
          />
          <div styleName="view">
            <div styleName="header">
              <button
                styleName="menuButton"
                type="button"
                onClick={this.handleOpenSidebar}
              />
              <div styleName="title">The Reactivation Baseline</div>
            </div>
            {children}
          </div>
        </div>
        <Sidebar.Host styleName="sidebar">
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
