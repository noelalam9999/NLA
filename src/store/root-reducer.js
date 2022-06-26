import { combineReducers } from "redux";
import nodeStoreReducer from "./nodesStore/nodeStoreReducer";
import getNodeClickStateReducer from "./getNodeClickState/getNodeClickStateReducer";
const rootReducer = combineReducers({
  nodeStoreReducer,
  getNodeClickStateReducer,
});
export default rootReducer;
