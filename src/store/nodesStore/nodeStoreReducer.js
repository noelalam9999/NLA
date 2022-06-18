import {
  NODE_RESULTS_REQUEST,
  NODE_RESULTS_SUCCESS,
  NODE_RESULTS_FAILURE,
} from "./nodeStoreType";
const userState = {
  isLoggedIn: false,
  loading: false,
  user: [],
  error: "",
};
const signInReducer = (state = userState, action) => {
  switch (action.type) {
    case NODE_RESULTS_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loading: action.loading,
      };
    case NODE_RESULTS_SUCCESS:
      const newAuthState = {
        ...state,
        isLoggedIn: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return newAuthState;
    case NODE_RESULTS_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        loading: action.loading,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default signInReducer;
