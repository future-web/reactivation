import React, { useContext, useEffect, useState } from "react";

import { Feature } from "@types/api/feature";
import { ApiContext } from "contexts/api";
import FeaturesView from "components/features-view";

export const FeaturesContainer = () => {
  const api = useContext(ApiContext);

  const [query, setQuery] = useState("");
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    async function getFeatures() {
      setFeatures(await api.getFeatures());
    }

    getFeatures();
  }, [api]);

  return (
    <FeaturesView
      features={features}
      query={query}
      onQueryChange={setQuery}
    />
  );
};
