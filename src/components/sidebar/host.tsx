import React from "react";

import "./host.css";

interface PropsType {
  className?: string;
};

const SidebarHost = ({ className, ...etc }: PropsType) => (
  <div className={className} styleName="root" {...etc} />
);

SidebarHost.defaultProps = {
  className: null
};

export default SidebarHost;
