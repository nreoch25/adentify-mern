import fetch from "isomorphic-fetch";
const API_URL = "http://localhost:8000/api/request";
import { FETCH_AD_RESPONSES, RESET_AD_RESPONSES, SAVE_AD_REQUESTS, SAVE_SUBMITTED_REQUESTS } from "./types";

export function resetAdResponses() {
  return {
    type: RESET_AD_RESPONSES,
    payload: []
  }
}

export function saveSubmittedRequest(adRequests) {
  return {
    type: SAVE_SUBMITTED_REQUESTS,
    payload: adRequests
  }
}

export function saveAdRequests(adRequests) {
  return {
    type: SAVE_AD_REQUESTS,
    payload: adRequests
  }
}

export function fetchAdRequests(adRequests) {
  return (dispatch) => {
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
      return response.json();
    }).then((response) => {
      dispatch({
        type: FETCH_AD_RESPONSES,
        payload: response.ads
      });
    });
  }
}
