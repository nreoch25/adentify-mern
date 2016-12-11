import { FETCH_AD_RESPONSES, RESET_AD_RESPONSES, SAVE_AD_REQUESTS, SAVE_SUBMITTED_REQUESTS } from "../actions/types";
const initialState = { ads: [], saved: [], submitted: [] };

export default function(state = initialState, action) {
  console.log(action.type);
  switch(action.type) {
    case FETCH_AD_RESPONSES:
      return { ...state, ads: action.payload }
      break;
    case RESET_AD_RESPONSES:
      return { ...state, ads: action.payload }
      break;
    case SAVE_AD_REQUESTS:
      return { ...state, saved: action.payload }
      break;
    case SAVE_SUBMITTED_REQUESTS:
      return { ...state, submitted: action.payload }
      break;
  }
  return state;
}
