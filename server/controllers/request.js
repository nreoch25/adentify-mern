import fetch from "isomorphic-fetch";
import Promise from "bluebird";

exports.fetchRequests = function(req, res, next) {
  let adRequests = req.body.adRequests
  adRequests.map((request) => {
    fetch(request, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      })
    }).then((response) => {
      console.log(response.json());
    });
  });
  Promise.all(adRequests).then((response) => {
    //console.log(response.json());
  });

  res.send({ "hello": "world"});
}
