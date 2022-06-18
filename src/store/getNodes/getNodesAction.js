import {
  GET_NODES_REQUEST,
  GET_NODES_SUCCESS,
  GET_NODES_FAILURE,
} from "./getNodesType";
import Api from "../../services/Api";

const getNodesRequest = (data) => {
  return {
    type: GET_NODES_REQUEST,
    loading: true,
  };
};
const getNodesSuccess = (SignInData) => {
  return {
    type: GET_NODES_SUCCESS,
    payload: SignInData,
    loading: false,
  };
};
const getNodesFailure = (error) => {
  return {
    type: GET_NODES_FAILURE,
    payload: error,
    loading: false,
  };
};

const getNodesState = (modelData) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getNodesRequest(loading));

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
      dispatch(getNodesSuccess(data, loading));
      // console.log(res);
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getNodesFailure(msg, loading));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNodesRequest,
  getNodesSuccess,
  getNodesFailure,
  getNodesState,
};
