import createBox from "../bigbox";

import Service from "../contexts/service";

const INITIAL_STATE = {
  items: []
};

class FeaturesAdapter {
  constructor(state, update, service) {
    this.state = state;
    this.update = update;
    this.service = service;
  }

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
    this.update({ items: await this.service.getFeatures() });
  }
}

export default createBox(FeaturesAdapter, [Service], INITIAL_STATE);
