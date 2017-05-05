import request from "request";
import vm from "vm";
import { updateCorrelator, replaceCorrelator, writeAdRequestFiles, getAdRequestFiles } from "../utils/gptServer";
import phantomService from "../services/phantomService";

exports.fetchRequests = function(req, res, next) {
  let adRequests = req.body.adRequests;
  console.log(adRequests);
  let adResponses = [];
  let adInformation = [];
  let completeAdObject = {};
  let totalRequests = adRequests.length;
  let newCorrelator = updateCorrelator();
  let requestObject;
  adRequests.map((adRequest) => {
    let updatedRequest = replaceCorrelator(newCorrelator, adRequest);
    // TODO need to look into different JSONP callbacks
    request(updatedRequest, (error, response, body) => {
      if(response.statusCode === 200) {
        // check for alternate jsonp callback
        if(body.indexOf("googletag.impl.pubads.") > -1) {
          let newBody = body.replace("googletag.impl.pubads.", "");
          let callbackFunction = newBody.match(/callbackProxy(\d+)/);
          newBody = newBody.replace(callbackFunction[0], "");
          newBody = `callbackProxy${newBody}`;
          let jsonpSandbox = vm.createContext({callbackProxy: (r) => { return r; }});
          requestObject = vm.runInContext(newBody, jsonpSandbox);
        } else {
          let jsonpSandbox = vm.createContext({callbackProxy: (r) => { return r; }});
          requestObject = vm.runInContext(body, jsonpSandbox);
        }

        adResponses.push(requestObject);
        // only run this if all ads are fetched
        if(adResponses.length === totalRequests) {
          // Responses ready
          // write ad request html to files in dist/ads
          writeAdRequestFiles(adResponses)
          // create an array of adFile URLS
          let adRequestFileUrls = getAdRequestFiles();
          // map through the array of files
          adRequestFileUrls.map((file, i) => {
            let url = `./dist/ads/${file}`
            let phRequest = new phantomService(url);
            phRequest.phantomRequest()
              .then((response) => {
                // push info response to array
                adInformation.push(response);
                // Don't send response until everything is ready
                if(adInformation.length === totalRequests) {
                  // TODO match up ads and info
                  res.send({ ads: adResponses, info: adInformation });
                }
              })
              .catch((error) => {
                console.log("ERROR", error);
              });
          });
        }
      }
    });
  });
}
