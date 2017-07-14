import fetch from "isomorphic-fetch";

let apiURL;
// store the url for the API
if(typeof window !== "undefined") {
  apiURL = `${window.location.origin}/api/request`;
}
import { FETCH_AD_RESPONSES, RESET_AD_RESPONSES, SAVE_AD_REQUESTS, SAVE_SUBMITTED_REQUESTS, RESET_SAVED_RESPONSES, UPDATE_SAVED_RESPONSES, SET_SUBMIT_ERRORS } from "./types";

export function setSubmitErrors(errors) {
  return {
    type: SET_SUBMIT_ERRORS,
    payload: errors
  }
}

export function resetAdResponses() {
  return {
    type: RESET_AD_RESPONSES,
    payload: { ads: [], info: [] }
  }
}

export function updateSavedResponses(update) {
  return {
    type: UPDATE_SAVED_RESPONSES,
    payload: update
  }
}

export function resetSavedResponses() {
  return {
    type: RESET_SAVED_RESPONSES,
    payload: []
  }
}

export function saveSubmittedRequest(adRequests) {
  console.log("SAVE SUBMITTED", adRequests);
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
    return fetch(apiURL, {
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
        payload: { ads: response.ads, info: response.info }
      });
    }).catch((error) => {
      console.log("HERE", error);
    });
  }
}
