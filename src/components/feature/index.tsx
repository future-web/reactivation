import React from "react";

import { FeatureType } from "@types/api/feature";

import "./style.css";

interface PropsType {
  feature: FeatureType;
}

export const Feature = ({ feature }: PropsType) => (
  <div styleName="root">
    {feature.icon && (
      <img
        styleName="icon"
        src={feature.icon}
        alt={`Icon for ${feature.title}`}
      />
    )}
    <div styleName="details">
      <h1 styleName="title">{feature.title}</h1>
      <p styleName="description">{feature.description}</p>
    </div>
  </div>
);
