import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Api from "./services/api";
import reducer from "./reducers";
import FeaturesContainer from "./containers/features";
import ErrorBoundary from "./components/error-boundary";
import App from "./components/app";

import "./styles/global.css";

export default errorHandler => {
  // prettier-ignore
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const api = new Api(process.env.API_BASE_URI || "");

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument({ api })))
  );

  const root = (
    <ErrorBoundary onError={errorHandler}>
      <Provider store={store}>
        <Router>
          <App>
            <Switch>
              <Route component={FeaturesContainer} />
            </Switch>
          </App>
        </Router>
      </Provider>
    </ErrorBoundary>
  );

  render(root, document.querySelector("#root"));
};
