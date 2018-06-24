import createBox, { Adapter } from "../bigbox";

import Service from "../contexts/service";

export class Features extends Adapter {
  state = {
    items: []
  };

  get items() {
    return this.state.items;
  }

  matching(query) {
    const pattern = new RegExp(query, "i");
    const matchingFeatures = this.items.filter(
      f => f.title.match(pattern) || f.description.match(pattern)
    );

    return matchingFeatures;
  }

  async getFeatures() {
    this.setState({ items: await this.props.service.getFeatures() });
  }
}

export default createBox(Features, { service: Service });
