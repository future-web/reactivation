import React from "react";

import "./style.css";

interface PropsType {
  className?: string;
  type: string;
}

const Icon = ({ className, type }: PropsType) => (
  <span styleName="root" className={className} data-type={type} />
);

Icon.defaultProps = {
  className: null
};

export default Icon;
