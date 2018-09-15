import React from "react";
import classnames from "classnames";

import styles from "./style.css";

type PropsType = {
  className?: string,
  type: string
};

const Icon = ({ className, type }: PropsType) => (
  <span className={classnames(styles.host, className)} data-type={type} />
);

Icon.defaultProps = {
  className: null
};

export default Icon;
