import { FeatureType } from "./feature";

export interface ApiType {
  getFeatures(): Promise<FeatureType[]>;
}
