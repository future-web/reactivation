import React, { useState } from "react";
import classnames from "classnames";

import * as Sidebar from "../sidebar";

import "./style.css";

interface PropsType {
  children: React.node;
}

export const App = ({ children }: PropsType) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div styleName={classnames("root", { isSidebarOpen })}>
      <div styleName="main">
        <button
          styleName="closer"
          type="button"
          hidden={!isSidebarOpen}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div styleName="view">
          <div styleName="header">
            <button
              styleName="menuButton"
              type="button"
              onClick={() => setIsSidebarOpen(true)}
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
};
