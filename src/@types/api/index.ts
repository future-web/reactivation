import { FeatureType } from "./feature";

export interface Api {
  getFeatures(): Promise<FeatureType>;
}
