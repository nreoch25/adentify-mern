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
  static getAdSizes(adSizes, totalAds) {
    let adSizesArray = [];
    for(let i = 0; i < totalAds; i++) {
      adSizesArray[i] = adSizes[i].replace(" ", "").split(/,|x/);
      adSizesArray[i] = adSizesArray[i].map(Number);
    }

    console.log(adSizesArray[0]);

    let finalAdSizesArray = [];
    adSizesArray.map((requestSizes, i) => {
      console.log("REQUEST", requestSizes, "INDEX", i);
      finalAdSizesArray[i] = [];
      function recurseSizes() {
        if(requestSizes.length >= 2) {
          let sizeArray = requestSizes.slice(0, 2);
          requestSizes.splice(0, 2);
          finalAdSizesArray[i].push(sizeArray);
          recurseSizes();
        } else {
          return;
        }
      }
      recurseSizes();
    });
    return finalAdSizesArray;
  }
  static adRequests(gptObject) {
    let adSizes = gptObject.adSizes;
    let totalAds = gptObject.totalAds;
    let finalAdSizesArray = this.getAdSizes(adSizes, totalAds);
    console.log("Final Sizes", finalAdSizesArray);

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
