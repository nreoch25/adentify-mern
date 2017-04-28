import phantom from "phantom";
// TODO create an array of objects that passes back information
// TODO get Network requests

export default class phantomService {
  constructor(filePath) {
    this.filePath = filePath;
    this.time = Date.now();
    this.loadTime;
    this.page;
    this.ph;
  }
  phantomRequest() {
    console.log("PHANTOM REQUEST", this.filePath);
    phantom.create().then(ph => {
      this.ph = ph;
      return this.ph.createPage();
    }).then(page => {
      this.page = page;
      return this.page.open(this.filePath)
    }).then(status => {
      console.log(status);
      this.time = Date.now() - this.time;
      this.loadTime = this.time / 1000;
      console.log("LOAD TIME", this.loadTime);
      return this.ph.execute("phantom", "property", ["cookies"])
    }).then(cookies => {
      console.log(cookies);
      this.page.close();
      this.ph.exit();
    }).catch(e => console.log(e));
  }
}
