import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Api from "./services/api";
import reducer from "./reducers";
import FeaturesContainer from "./containers/FeaturesContainer";
import App from "./components/App";

import "./styles/global.css";

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const api = new Api(process.env.API_BASE_URI);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ api })))
);

const root = (
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route component={FeaturesContainer} />
        </Switch>
      </App>
    </Router>
  </Provider>
);

render(root, document.querySelector("#root"));