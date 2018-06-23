import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Api from "./services/api";

import Service from "./contexts/service";

import Features from "./boxes/features";

import App from "./components/App";

import FeaturesContainer from "./components/views/features";

import "./styles/global.css";

const api = new Api(process.env.API_BASE_URI);

const root = (
  <Service.Provider value={api}>
    <Features.Provider>
      <Router>
        <App>
          <Switch>
            <Route component={FeaturesContainer} />
          </Switch>
        </App>
      </Router>
    </Features.Provider>
  </Service.Provider>
);

render(root, document.querySelector("#root"));
