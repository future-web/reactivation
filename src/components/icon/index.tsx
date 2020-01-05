import React from "react";

import "./style.css";

interface PropsType {
  className?: string;
  type: string;
}

export const Icon = ({ className, type }: PropsType) => (
  <span styleName="root" className={className} data-type={type} />
);

Icon.defaultProps = {
  className: null
};
