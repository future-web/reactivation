import React from "react";

import "./section.css";

interface PropsType {
  title?: string;
  children?: React.Node;
};

const SidebarSection = ({ title, children }: PropsType) => (
  <div styleName="root">
    {title && <div styleName="title">{title}</div>}
    <div styleName="content">{children}</div>
  </div>
);

SidebarSection.defaultProps = {
  title: null,
  children: null
};

export default SidebarSection;
