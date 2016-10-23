import callApi from "../util/apiCaller";

// Export Constants
export const ADD_DATA = 'ADD_DATA';

export function addData(posts) {
  return {
    type: ADD_DATA,
    posts
  }
}

export function fetchData() {
  return (dispatch) => {
    return callApi("posts", "get").then(res => {
      dispatch(addData(res.posts));
    });
  };
}
