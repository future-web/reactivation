import { Feature } from "./feature";

export interface Api {
  getFeatures(): Promise<Feature>
}
