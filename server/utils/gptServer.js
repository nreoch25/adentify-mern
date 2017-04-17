import fs from "fs";

export function updateCorrelator(adRequest) {
  // create a new 16 digit correlator
  let newCorrelatorString = (Math.random()+" ").substring(2,10)+(Math.random()+" ").substring(2,10);
  // create the new correlator
  newCorrelatorString = `correlator=${newCorrelatorString}`;
  return newCorrelatorString;
}

export function replaceCorrelator(newCorrelator, adRequest) {
  // get the adRequest correlator
  let correlator = adRequest.match(/correlator=\d+/);
  // replace correlator with new correlator
  let newRequest = adRequest.replace(correlator, newCorrelator);
  return newRequest;
}

function getHierarchy(adRequest) {
  let hierarchy;
  for(var key in adRequest) {
    hierarchy = key;
    return hierarchy;
  }
}

export function writeAdRequestFiles(adRequests) {
  let hierarchy = getHierarchy(adRequests[0]);
  adRequests.map((request) => {
    console.log(request[hierarchy]._html_);
  });
}
