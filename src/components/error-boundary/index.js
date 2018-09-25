import React from "react";

type PropsType = {
  onError: (error: Error, errorInfo: React.ErrorInfo) => void,
  children?: React.ReactNode
};

export default class ErrorBoundary extends React.Component<PropsType> {
  static defaultProps = {
    children: null
  };

  componentDidCatch(err) {
    const { onError } = this.props;
    onError(err);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
