import request from "request";
import vm from "vm";

exports.fetchRequests = function(req, res, next) {
  let adRequests = req.body.adRequests
  let adResponses = [];
  let totalRequests = adRequests.length;
  adRequests.map((adRequest) => {
    request(adRequest, (error, response, body) => {
      if(response.statusCode = 200) {
        let jsonpSandbox = vm.createContext({callbackProxy: (r) => { return r; }});
        let requestObject = vm.runInContext(body, jsonpSandbox);
        adResponses.push(requestObject);
        if(adResponses.length === totalRequests) {
          // Responses ready
          console.log(adResponses);
          res.send({ "hello": "world"});
        }
      }
    });
  });
}
