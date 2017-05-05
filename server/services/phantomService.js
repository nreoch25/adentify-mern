import phantom from "phantom";
// TODO create an array of objects that passes back information
// TODO get Network requests

export default class phantomService {
  constructor(filePath) {
    this.filePath = filePath;
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
        this.phantomAdObject.cookies = cookies;
        resolve(this.phantomAdObject);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
