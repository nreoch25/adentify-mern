import request from "request";
import vm from "vm";
import { updateCorrelator } from "../utils/gptServer";

exports.fetchRequests = function(req, res, next) {
  let adRequests = req.body.adRequests
  let adResponses = [];
  let totalRequests = adRequests.length;
  adRequests.map((adRequest) => {
    let updatedRequest = updateCorrelator(adRequest);
    request(updatedRequest, (error, response, body) => {
      if(response.statusCode = 200) {
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
