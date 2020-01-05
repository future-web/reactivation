import React from "react";

import "./style.css";

interface PropsType {
  className?: string;
}

export const Host = ({ className, ...etc }: PropsType) => (
  <div className={className} styleName="root" {...etc} />
);

Host.defaultProps = {
  className: null
};
