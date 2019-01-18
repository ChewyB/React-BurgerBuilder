import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
      
    case actionTypes.AUTH_START_SUCCESS:
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    }
    case actionTypes.AUTH_START_FAIL:
    return {
        ...state,
        error: action.error,
        loading: false
    }

    case actionTypes.AUTH_LOGOUT:
    return {
        ...state,
        token: null,
        userId: null
    }

    default:
      return state;
  }
};

export default reducer;
