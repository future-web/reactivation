import React from "react";

import "./style.css";

interface PropsType {
  icon?: string;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: PropsType) => (
  <div styleName="root">
    {icon && <img styleName="icon" src={icon} alt={`Icon for ${title}`} />}
    <h1 styleName="title">{title}</h1>
    <p styleName="description">{description}</p>
  </div>
);

Feature.defaultProps = {
  icon: null
};

export default Feature;
