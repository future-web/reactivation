import React, { useContext, useEffect, useState } from "react";

import { FeatureType } from "@types/api/feature";
import { ApiContext } from "contexts/api";
import { useLoader } from "hooks/use-loader";
import FeaturesView from "components/features-view";

export const FeaturesContainer = () => {
  const api = useContext(ApiContext);

  const [query, setQuery] = useState("");
  const [features, setFeatures] = useState<FeatureType[]>([]);
  const [isBusy, addLoadingOperation] = useLoader();

  useEffect(() => {
    async function getFeatures() {
      setFeatures(await addLoadingOperation(api.getFeatures()));
    }

    getFeatures();
  }, [api, addLoadingOperation]);

  return (
    <FeaturesView
      features={features}
      query={query}
      isBusy={isBusy}
      onQueryChange={setQuery}
    />
  );
};
