import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import { config } from "services/ambient-config";
import { HttpApi } from "services/api";
import { Fetcher } from "utils/fetcher";
import { ApiContext } from "contexts/api";
import { FeaturesContainer } from "containers/features";
import { Shell } from "components/shell";

import "./styles/global.css";

const api = new HttpApi(config.apiBaseUrl, new Fetcher());

const root = (
  <ApiContext.Provider value={api}>
    <Shell>
      <Router>
        <FeaturesContainer path="/" />
      </Router>
    </Shell>
  </ApiContext.Provider>
);

render(root, document.querySelector("#root"));
