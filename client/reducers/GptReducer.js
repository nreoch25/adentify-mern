import { FETCH_AD_RESPONSES, RESET_AD_RESPONSES, SAVE_AD_REQUESTS, SAVE_SUBMITTED_REQUESTS, RESET_SAVED_RESPONSES, UPDATE_SAVED_RESPONSES } from "../actions/types";
const initialState = { ads: [], info: [], saved: [], submitted: [] };

export default function(state = initialState, action) {
  console.log(action.type);
  switch(action.type) {
    case FETCH_AD_RESPONSES:
      return { ...state, ads: action.payload.ads, info: action.payload.info }
      break;
    case RESET_AD_RESPONSES:
      return { ...state, ads: action.payload, info: action.payload.info }
      break;
    case SAVE_AD_REQUESTS:
      return { ...state, saved: action.payload }
      break;
    case SAVE_SUBMITTED_REQUESTS:
      return { ...state, submitted: action.payload }
      break;
    case RESET_SAVED_RESPONSES:
      return { ...state, submitted: action.payload }
      break;
    case UPDATE_SAVED_RESPONSES:
      return { ...state, saved: action.payload }
      break;
  }
  return state;
}
