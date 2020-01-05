import React from "react";

import { FeatureType } from "@types/api/feature";
import { Feature } from "components/feature";

import "./style.css";

interface PropsType {
  features: FeatureType[];
}

export const FeaturesList = ({ features, className, ...etc }: PropsType) => (
  <div styleName="root" className={className} {...etc}>
    {features.map(feature => (
      <Feature key={feature.id} feature={feature} />
    ))}
  </div>
);
