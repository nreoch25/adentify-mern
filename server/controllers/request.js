import fetch from "isomorphic-fetch";

exports.fetchRequests = function(req, res, next) {
  console.log(req.body.adRequests);
  res.send({ "hello": "world"});
}
