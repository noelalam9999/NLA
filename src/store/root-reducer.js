import { combineReducers } from "redux";
import nodeStoreReducer from "./nodesStore/nodeStoreReducer";
const rootReducer = combineReducers({
  nodeStoreReducer,
});
export default rootReducer;
