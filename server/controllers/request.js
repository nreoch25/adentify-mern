import request from "request";
import vm from "vm";
import { updateCorrelator, replaceCorrelator, writeAdRequestFiles, getAdRequestFiles } from "../utils/gptServer";
import phantomService from "../services/phantomService";

exports.fetchRequests = function(req, res, next) {
  let adRequests = req.body.adRequests
  let adResponses = [];
  let totalRequests = adRequests.length;
  let newCorrelator = updateCorrelator();
  let requestObject;
  adRequests.map((adRequest) => {
    let updatedRequest = replaceCorrelator(newCorrelator, adRequest);
    // TODO need to look into different JSONP callbacks
    request(updatedRequest, (error, response, body) => {
      if(response.statusCode = 200) {
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
        if(adResponses.length === totalRequests) {
          // Responses ready
          // write ad request html to files in dist/ads
          writeAdRequestFiles(adResponses)
          // create an array of adFile URLS
          let adRequestFileUrls = getAdRequestFiles();
          // map through the array of files
          adRequestFileUrls.map((file) => {
            let url = `./dist/ads/${file}`
            let phRequest = new phantomService(url);
            phRequest.phantomRequest();
          });

          res.send({ ads: adResponses });
        }
      }
    });
  });
}
