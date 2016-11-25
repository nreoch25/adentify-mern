import { combineReducers } from "redux";
import app from "./AppReducer";
import gpt from "./GptReducer";

export default combineReducers({
  app,
  gpt
});
