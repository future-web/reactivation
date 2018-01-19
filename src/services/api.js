import JsonService from "./json-service";

export default class Api extends JsonService {
  getFeatures() {
    return this.getResponse("/features");
  }
}
