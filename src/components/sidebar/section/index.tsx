import React from "react";

import "./style.css";

interface PropsType {
  title?: string;
  children?: React.Node;
}

export const Section = ({ title, children }: PropsType) => (
  <div styleName="root">
    {title && <div styleName="title">{title}</div>}
    <div styleName="content">{children}</div>
  </div>
);

Section.defaultProps = {
  title: null,
  children: null
};
