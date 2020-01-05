import React from "react";

import "./style.css";

interface PropsType {
  icon: React.node;
  children?: React.Node;
}

export const LinkItem = ({ icon: Icon, children, ...etc }: PropsType) => (
  <a styleName="root" {...etc}>
    <Icon styleName="icon" />
    <span>{children}</span>
  </a>
);

LinkItem.defaultProps = {
  children: null
};
