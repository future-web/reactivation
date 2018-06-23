import React from "react";

export default class State extends React.Component {
  static defaultProps = {
    initial: {}
  };

  state = this.props.initial;

  render() {
    return this.props.children(this.state, this.setState.bind(this));
  }
}
