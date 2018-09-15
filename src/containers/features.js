import React from "react";
import { connect } from "react-redux";

import * as featureActions from "../actions/features";
import FeaturesView from "../components/features-view";

type PropsType = {
  features: any[],
  onRequestFeatures: void => void
};

export class Features extends React.Component<PropsType> {
  state = {
    query: ""
  };

  componentDidMount() {
    const { onRequestFeatures } = this.props;
    onRequestFeatures();
  }

  handleQueryChange = query => this.setState({ query });

  render() {
    const { features } = this.props;
    const { query } = this.state;

    return (
      <FeaturesView
        features={features}
        query={query}
        onQueryChange={this.handleQueryChange}
      />
    );
  }
}

const mapStateToProps = ({ features }) => ({ features });

const mapDispatchToProps = {
  onRequestFeatures: featureActions.requestFeatures
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Features);
