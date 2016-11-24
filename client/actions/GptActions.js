import fetch from "isomorphic-fetch";
const API_URL = "http://localhost:8000/api/request";

export function fetchAdRequests(adRequests) {
  return (dispatch) => {
    console.log("GPT ACTIONS", adRequests);
    // TODO serialize array of adRequests / JSON.stringify({})
    // post ad Requests to express api
    return fetch(API_URL, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      mode: "same-origin",
      cache: "default",
      body: JSON.stringify({adRequests})
    }).then((response) => {
      console.log(response.json());
    });
  }
}
