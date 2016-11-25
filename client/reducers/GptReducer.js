import { FETCH_AD_RESPONSES } from "../actions/types";
const initialState = { ads: [] };

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_AD_RESPONSES:
      return { ...state, ads: action.payload }
  }
  return state;
}
