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

  async getFeatures() {
    this.update({ items: await this.service.getFeatures() });
  }
}

export default createBox(FeaturesAdapter, [Service], INITIAL_STATE);
