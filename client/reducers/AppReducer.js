import { ADD_DATA } from "../actions/AppActions";
const initialState = { data: [] };

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return { data: action.posts };
    default:
      return state;
  }
}

export default AppReducer;
