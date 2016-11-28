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
