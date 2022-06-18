import axios from "axios";
import {
  NODE_RESULTS_REQUEST,
  NODE_RESULTS_SUCCESS,
  NODE_RESULTS_FAILURE,
} from "./nodeStoreType";
import Api from "../../services/Api";

const nodeStoreRequest = (data) => {
  return {
    type: NODE_RESULTS_REQUEST,
    loading: true,
  };
};
const nodeStoreSuccess = (SignInData) => {
  return {
    type: NODE_RESULTS_SUCCESS,
    payload: SignInData,
    loading: false,
  };
};
const nodeStoreFailure = (error) => {
  return {
    type: NODE_RESULTS_FAILURE,
    payload: error,
    loading: false,
  };
};

const nodeState = (modelData) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(nodeStoreRequest(loading));

      // alert("i am in action", userState);

      console.log("modelData: ", modelData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let { data } = await Api(
        "POST",
        "api/add/model/edges",
        modelData,
        config
      );
      console.log("This is res from Action: ", data);
      // const api = `${process.env.REACT_APP_Base_URL}/accounts/login`;
      // var res = await axios.post(api, userState);
      // const { data } = res;
      loading = false;
      dispatch(nodeStoreSuccess(data, loading));
      // console.log(res);
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(nodeStoreFailure(msg, loading));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nodeStoreRequest,
  nodeStoreSuccess,
  nodeStoreFailure,
  nodeState,
};
