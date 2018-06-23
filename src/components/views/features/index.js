import * as React from "react";

import FeaturesBox from "../../../boxes/features";

import State from "../../../state";
import Lifecycle from "../../../lifecycle";

import SearchInput from "../../SearchInput";
import Feature from "../../Feature";

import styles from "./style.css";

type ListProps = {
  features: any[]
};

const FeaturesList = ({ features }: ListProps) => (
  <div className={styles.features}>
    {features.map(feature => <Feature key={feature.id} {...feature} />)}
  </div>
);

const INITIAL_STATE = {
  query: ""
};

const FeaturesView = () => (
  <State initial={INITIAL_STATE}>
    {({ query }, update) => (
      <FeaturesBox.Consumer>
        {features => {
          const matchingFeatures = features.matching(query);

          return (
            <Lifecycle onMount={() => features.getFeatures()}>
              <div className={styles.host}>
                <SearchInput
                  className={styles.searchbox}
                  placeholder="Search for a feature"
                  value={query}
                  onChange={e => update({ query: e.target.value })}
                />
                {matchingFeatures.length ? (
                  <FeaturesList features={matchingFeatures} />
                ) : (
                  <div className={styles.notice}>
                    No features matched your search terms.
                  </div>
                )}
              </div>
            </Lifecycle>
          );
        }}
      </FeaturesBox.Consumer>
    )}
  </State>
);

export default FeaturesView;
