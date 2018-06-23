import * as React from "react";

import FeaturesBox from "../boxes/features";

import Lifecycle from "../lifecycle";
import State from "../state";

import FeaturesView from "../components/FeaturesView";

const INITIAL_STATE = {
  query: ""
};

const Features = () => (
  <State initial={INITIAL_STATE}>
    {({ query }, update) => (
      <FeaturesBox.Consumer>
        {features => (
          <Lifecycle onMount={() => features.getFeatures()}>
            <FeaturesView
              features={features.items}
              query={query}
              onQueryChange={query => update({ query })}
            />
          </Lifecycle>
        )}
      </FeaturesBox.Consumer>
    )}
  </State>
);

export default Features;
