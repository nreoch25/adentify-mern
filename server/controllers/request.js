import request from "request";
import vm from "vm";
import { updateCorrelator, replaceCorrelator } from "../utils/gptServer";

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
        }

        let jsonpSandbox = vm.createContext({callbackProxy: (r) => { return r; }});
        let requestObject = vm.runInContext(body, jsonpSandbox);

        adResponses.push(requestObject);
        if(adResponses.length === totalRequests) {
          // Responses ready
          // TODO setup headless browser
          res.send({ ads: adResponses });
        }
      }
    });
  });
}
