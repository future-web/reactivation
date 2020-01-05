import React from "react";

import { Icon } from "components/icon";

import "./style.css";

interface PropsType {
  icon: string;
  children?: React.Node;
}

export const LinkItem = ({ icon, children, ...etc }: PropsType) => (
  <a styleName="root" {...etc}>
    <Icon styleName="icon" type={icon} />
    <span>{children}</span>
  </a>
);

LinkItem.defaultProps = {
  children: null
};
