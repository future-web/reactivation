import { FETCH_FEATURES_SUCCESS } from "../constants";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  if (action.type === FETCH_FEATURES_SUCCESS) {
    return action.payload;
  }

  return state;
};
