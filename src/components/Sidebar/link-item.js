import * as React from "react";

import Icon from "../Icon";

import styles from "./link-item.css";

type Props = {
  icon: string,
  children?: React.Node
};

const SidebarLinkItem = ({ icon, children, ...etc }: Props) => (
  <a className={styles.root} {...etc}>
    <Icon className={styles.icon} type={icon} />
    <span>{children}</span>
  </a>
);

SidebarLinkItem.defaultProps = {
  children: null
};

export default SidebarLinkItem;
