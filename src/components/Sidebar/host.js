import React from "react";
import classnames from "classnames";

import styles from "./host.css";

type PropsType = {
  className?: string
};

const SidebarHost = ({ className, ...etc }: PropsType) => (
  <div className={classnames(styles.host, className)} {...etc} />
);

SidebarHost.defaultProps = {
  className: null
};

export default SidebarHost;
