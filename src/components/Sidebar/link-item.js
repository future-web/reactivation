import React from "react";

import Icon from "../icon";

import styles from "./link-item.css";

type PropsType = {
  icon: string,
  children?: React.Node
};

const SidebarLinkItem = ({ icon, children, ...etc }: PropsType) => (
  <a className={styles.root} {...etc}>
    <Icon className={styles.icon} type={icon} />
    <span>{children}</span>
  </a>
);

SidebarLinkItem.defaultProps = {
  children: null
};

export default SidebarLinkItem;
