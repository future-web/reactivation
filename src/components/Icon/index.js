import * as React from "react";
import classnames from "classnames";

import styles from "./style.css";

type Props = {
  className?: string,
  type: string
};

const Icon = ({ className, type }: Props) => (
  <span className={classnames(styles.host, className)} data-type={type} />
);

Icon.defaultProps = {
  className: null
};

export default Icon;
