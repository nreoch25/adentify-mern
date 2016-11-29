import { FETCH_AD_RESPONSES, RESET_AD_RESPONSES } from "../actions/types";
const initialState = { ads: [] };

export default function(state = initialState, action) {
  console.log(action.type);
  switch(action.type) {
    case FETCH_AD_RESPONSES:
      return { ...state, ads: action.payload }
      break;
    case RESET_AD_RESPONSES:
      return { ...state, ads: action.payload }
      break;
  }
  return state;
}
