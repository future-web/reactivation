import * as React from "react";

import SearchInput from "../SearchInput";
import Feature from "../Feature";

import styles from "./style.css";

type ListProps = {
  features: any[]
};

type ViewProps = ListProps & {
  query?: string,
  onQueryChange: string => void
};

function getMatchingFeatures(features, query) {
  const pattern = new RegExp(query, "i");
  const matchingFeatures = features.filter(
    f => f.title.match(pattern) || f.description.match(pattern)
  );

  return matchingFeatures;
}

const FeaturesList = ({ features }: ListProps) => (
  <div className={styles.features}>
    {features.map(feature => (
      <Feature key={feature.id} {...feature} />
    ))}
  </div>
);

const FeaturesView = ({ features, query, onQueryChange }: ViewProps) => {
  const matchingFeatures = getMatchingFeatures(features, query);

  return (
    <div className={styles.host}>
      <SearchInput
        className={styles.searchbox}
        placeholder="Search for a feature"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
      {matchingFeatures.length ? (
        <FeaturesList features={matchingFeatures} />
      ) : (
        <div className={styles.notice}>
          No features matched your search terms.
        </div>
      )}
    </div>
  );
};

FeaturesView.defaultProps = {
  query: undefined
};

export default FeaturesView;
