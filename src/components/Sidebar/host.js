import * as React from "react";
import classnames from "classnames";

import styles from "./host.css";

type Props = {
  className?: string
};

const SidebarHost = ({ className, ...etc }: Props) => (
  <div className={classnames(styles.host, className)} {...etc} />
);

SidebarHost.defaultProps = {
  className: null
};

export default SidebarHost;
