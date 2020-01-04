import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import { HttpApi } from "services/api";
import { Fetcher } from "utils/fetcher";
import { ApiContext } from "contexts/api";
import { FeaturesContainer } from "containers/features";
import { App } from "components/app";

import "./styles/global.css";

const api = new HttpApi(process.env.API_BASE_URI, new Fetcher());

const root = (
  <ApiContext.Provider value={api}>
    <App>
      <Router>
        <FeaturesContainer path="/" />
      </Router>
    </App>
  </ApiContext.Provider>
);

render(root, document.querySelector("#root"));
