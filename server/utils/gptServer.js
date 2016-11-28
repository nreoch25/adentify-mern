export function updateCorrelator(adRequest) {
  // get the adRequest correlator
  let correlator = adRequest.match(/correlator=\d+/);
  // create a new 16 digit correlator
  let newCorrelatorString = (Math.random()+" ").substring(2,10)+(Math.random()+" ").substring(2,10);
  // create the new correlator
  newCorrelatorString = `correlator=${newCorrelatorString}`;
  // replace old correlator with new correlator
  adRequest = adRequest.replace(correlator, newCorrelatorString);
  return adRequest;
}
