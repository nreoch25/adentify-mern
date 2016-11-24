import fetch from "isomorphic-fetch";
const API_URL = "http://localhost:8000/api/request";

export function fetchAdRequests(adRequests) {
  return (dispatch) => {
    console.log("GPT ACTIONS", adRequests);
    // TODO serialize array of adRequests / JSON.stringify({})
    // post ad Requests to express api
    /*return fetch(API_URL, {
      method: "POST",
      body: {
        request
      }
    }).then((response) => {
      console.log(response);
    });*/
  }
}
