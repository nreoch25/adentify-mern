import fs from "fs-extra";

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

function createAdsDir() {
  let dir = "./dist/ads";
  // check if directory exists
  // if not create the directory
  // if it exists clear directory
  // for incoming ads
  if (!fs.existsSync(dir)){
    console.log("mkdir");
    fs.mkdirSync(dir);
  } else {
    // clear ads directory
    console.log("emptydir");
    fs.emptyDirSync(dir);
  }
}

export function writeAdRequestFiles(adRequests) {
  createAdsDir();
  let dir = "./dist/ads";
  let hierarchy = getHierarchy(adRequests[0]);
  adRequests.map((request, i) => {
    //console.log(request[hierarchy]._html_);
    //Write files to public directory for frontend and phantomjs to use
    console.log(`write file ad${i}.html to ${dir}`);
    fs.writeFileSync(`${dir}/ad${i}.html`, request[hierarchy]._html_);
  });
}
