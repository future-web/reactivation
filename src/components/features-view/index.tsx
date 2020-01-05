import React from "react";
import classnames from "classnames";

import { FeatureType } from "@types/api/feature";
import { SearchInput } from "components/search-input";
import { FeaturesList } from "components/features-list";

import "./style.css";

interface PropsType {
  query: string;
  features: FeatureType[];
  isBusy: boolean;
  onQueryChange(query: string);
}

function getMatchingFeatures(features, query) {
  const pattern = new RegExp(query, "i");
  const matchingFeatures = features.filter(
    f => f.title.match(pattern) || f.description.match(pattern)
  );

  return matchingFeatures;
}

export const FeaturesView = ({
  features,
  query,
  isBusy,
  onQueryChange
}: PropsType) => {
  const matchingFeatures = getMatchingFeatures(features, query);

  return (
    <div styleName={classnames("root", { isBusy })}>
      <SearchInput
        styleName="searchbox"
        placeholder="Search for a feature"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
      {matchingFeatures.length ? (
        <FeaturesList styleName="features" features={matchingFeatures} />
      ) : (
        <div styleName="notice">No features matched your search terms.</div>
      )}
    </div>
  );
};
