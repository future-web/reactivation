import {
  FETCH_FEATURES_REQUEST,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_FAILURE
} from "../constants";

export const requestFeatures = () => (dispatch, getState, { api }) => {
  const operation = api.getFeatures();

  dispatch({ type: FETCH_FEATURES_REQUEST });

  operation.then(
    payload => dispatch({ type: FETCH_FEATURES_SUCCESS, payload }),
    error => dispatch({ type: FETCH_FEATURES_FAILURE, error })
  );
};
