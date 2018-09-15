import React from "react";

import Icon from "../icon";

import "./link-item.css";

type PropsType = {
  icon: string,
  children?: React.Node
};

const SidebarLinkItem = ({ icon, children, ...etc }: PropsType) => (
  <a styleName="root" {...etc}>
    <Icon styleName="icon" type={icon} />
    <span>{children}</span>
  </a>
);

SidebarLinkItem.defaultProps = {
  children: null
};

export default SidebarLinkItem;
