import React from "react";

export class Adapter extends React.Component {
  render() {
    return this.props.children(this);
  }
}

export default function createBox(Adapter, contexts) {
  const Ctx = React.createContext(null);
  const context = contexts.service; // TODO:

  const Provider = ({ children }) => (
    <context.Consumer>
      {service => (
        <Adapter service={service}>
          {adapter => (
            <Ctx.Provider value={{ adapter }}>{children}</Ctx.Provider>
          )}
        </Adapter>
      )}
    </context.Consumer>
  );

  const Consumer = ({ children }) => (
    <Ctx.Consumer>{({ adapter }) => children(adapter)}</Ctx.Consumer>
  );

  return { Provider, Consumer };
}
