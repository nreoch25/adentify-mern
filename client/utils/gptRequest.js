class gptRequest {
  /* this creates ad containers */
  static gptElements(gptObject) {
    let adReference = gptObject.reference;
    for(let i = 0; i < gptObject.totalAds; i++) {
      this.adDivs[i] = `ad-${Math.floor((Math.random() * 1000000) + 1)}`;
      let adDiv = document.createElement("div");
      adDiv.setAttribute("id", this.adDivs[i]);
      adReference.appendChild(adDiv);
    }
  }
  static adRequests(gptObject) {
    let adSizes = gptObject.adSizes;
    let adSizesArray = [];
    for(let i = 0; i < gptObject.totalAds; i++) {
      adSizesArray[i] = adSizes[i].replace(" ", "").split(/,|x/);
    }

    console.log(adSizesArray);

    // TODO construct adsizes array that can be used by display call
    // Make ad calls
  }
  static initGPT() {
    // init gpt object
    this.win.googletag = this.win.googletag || {};
    this.win.googletag.cmd = this.win.googletag.cmd || [];

    this.win.googletag.cmd.push(() => {
      //set gpt rules
      this.win.googletag.pubads().enableAsyncRendering();
      this.win.googletag.enableServices();
    });
  }
  static init() {
    // Avoid global lookups
    this.win = window;
    this.doc = document;
    this.adDivs = [];

    this.initGPT();
  }
}

export default gptRequest;
