import React from "react";

import { FeatureType } from "@types/api/feature";

import "./style.css";

interface PropsType {
  feature: FeatureType;
}

export const Feature = ({ feature: { icon, title, description } }: PropsType) => (
  <div styleName="root">
    {icon && <img styleName="icon" src={icon} alt={`Icon for ${title}`} />}
    <div styleName="details">
      <h1 styleName="title">{title}</h1>
      <p styleName="description">{description}</p>
    </div>
  </div>
);
