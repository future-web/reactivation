import React from "react";
import classnames from "classnames";

import styles from "./style.css";

type PropsType = {
  className?: string
};

const SearchInput = ({ className, ...props }: PropsType) => (
  <input className={classnames(styles.host, className)} {...props} />
);

SearchInput.defaultProps = {
  className: null
};

export default SearchInput;
