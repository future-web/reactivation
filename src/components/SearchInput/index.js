import * as React from "react";
import classnames from "classnames";

import styles from "./style.css";

type Props = {
  className?: string
};

const SearchInput = ({ className, ...props }: Props) => (
  <input className={classnames(styles.host, className)} {...props} />
);

SearchInput.defaultProps = {
  className: null
};

export default SearchInput;
