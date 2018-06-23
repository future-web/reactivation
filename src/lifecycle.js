import React from "react";

export default class Lifecycle extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return this.props.children;
  }
}
