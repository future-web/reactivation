import React, { useState } from "react";
import classnames from "classnames";

import { Host } from "components/sidebar/host";
import { Section } from "components/sidebar/section";
import { LinkItem } from "components/sidebar/link-item";

import "./style.css";

interface PropsType {
  children: React.node;
}

export const Shell = ({ children }: PropsType) => {
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
      <Host styleName="sidebar">
        <Section title="Area one">
          <LinkItem icon="home">Home</LinkItem>
          <LinkItem icon="features">Features</LinkItem>
        </Section>
        <Section title="Area two">
          <LinkItem icon="settings">Settings</LinkItem>
          <LinkItem icon="health">Health</LinkItem>
        </Section>
      </Host>
    </div>
  );
};
