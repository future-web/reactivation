import * as React from "react";

import styles from "./section.css";

type Props = {
  title?: string,
  children?: React.Node
};

const SidebarSection = ({ title, children }: Props) => (
  <div className={styles.root}>
    {title && <div className={styles.title}>{title}</div>}
    <div className={styles.content}>{children}</div>
  </div>
);

SidebarSection.defaultProps = {
  title: null,
  children: null
};

export default SidebarSection;
