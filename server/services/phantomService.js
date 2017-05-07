import phantom from "phantom";
// TODO create an array of objects that passes back information
// TODO get Network requests

export default class phantomService {
  constructor(filePath, adId) {
    this.filePath = filePath;
    this.adId = adId;
    this.time = Date.now();
    this.phantomAdObject = {};
    this.phantomAdObject.networkRequests = [];
    this.loadTime;
    this.page;
    this.ph;
  }
  phantomRequest() {
    return new Promise((resolve, reject) => {
      phantom.create().then(ph => {
        this.ph = ph;
        return this.ph.createPage();
      }).then(page => {
        this.page = page;
        // look at the out_obj example
        this.page.on("onResourceRequested", (requestData) => {
          //this.phantomAdObject.networkRequests.push(requestData.url);
          this.phantomAdObject.networkRequests.push(requestData.url);
        });
        return this.page.open(this.filePath)
      }).then(status => {
        //console.log(status);
        this.time = Date.now() - this.time;
        this.loadTime = this.time / 1000;
        this.phantomAdObject.loadTime = this.loadTime;
        return this.ph.cookies();
      }).then(cookies => {
        // remove the first element of the networkRequests array
        // it is the request for this ad file
        this.phantomAdObject.networkRequests.shift();
        this.phantomAdObject.cookies = cookies;
        this.phantomAdObject.adId = this.adId;
        resolve(this.phantomAdObject);
        this.ph.exit();
        this.page.close();
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
