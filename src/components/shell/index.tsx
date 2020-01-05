import React, { useState } from "react";
import classnames from "classnames";

import { Host } from "components/sidebar/host";
import { Section } from "components/sidebar/section";
import { LinkItem } from "components/sidebar/link-item";
import { HouseIcon } from "components/icons/house";
import { CheckListIcon } from "components/icons/check-list";
import { GearIcon } from "components/icons/gear";
import { HeartIcon } from "components/icons/heart";
import { MenuIcon } from "components/icons/menu";

import "./style.css";

interface PropsType {
  children: React.node;
}

const MenuButton = ({ ...etc }) => (
  <button styleName="menuButton" type="button" {...etc}>
    <MenuIcon styleName="menuButtonIcon" />
  </button>
);

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
            <MenuButton onClick={() => setIsSidebarOpen(true)} />
            <div styleName="title">The Reactivation Baseline</div>
          </div>
          {children}
        </div>
      </div>
      <Host styleName="sidebar">
        <Section title="Area one">
          <LinkItem icon={HouseIcon}>Home</LinkItem>
          <LinkItem icon={CheckListIcon}>Features</LinkItem>
        </Section>
        <Section title="Area two">
          <LinkItem icon={GearIcon}>Settings</LinkItem>
          <LinkItem icon={HeartIcon}>Health</LinkItem>
        </Section>
      </Host>
    </div>
  );
};
