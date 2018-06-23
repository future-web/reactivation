import React from "react";

import State from "./state";

export default function createBox(Adapter, contexts, initialState) {
  const Ctx = React.createContext(null);
  const [context] = contexts; // TODO: reduce

  const Provider = ({ children }) => (
    <State initial={initialState}>
      {(state, updater) => (
        <context.Consumer>
          {service => (
            <Ctx.Provider value={new Adapter(state, updater, service)}>
              {children}
            </Ctx.Provider>
          )}
        </context.Consumer>
      )}
    </State>
  );

  return { Provider, Consumer: Ctx.Consumer };
}
