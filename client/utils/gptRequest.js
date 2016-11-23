class gptRequest {
  /* this creates ad containers */
  static gptElements(gptObject) {
    let adReference = gptObject.reference;
    for(let i = 0; i < gptObject.totalAds; i++) {
      this.adDivs[i] = `ad-${Math.floor((Math.random() * 1000000) + 1)}`;
      let adDiv = document.createElement("div");
      adDiv.setAttribute("id", this.adDivs[i]);
      let adDivContainer = document.createElement("div");
      adDivContainer.className = "well well-lg adrequest";
      adDivContainer.appendChild(adDiv);
      adReference.appendChild(adDivContainer);
    }
  }
  static getAdSizes(adSizes, totalAds) {
    let adSizesArray = [];
    for(let i = 0; i < totalAds; i++) {
      adSizesArray[i] = adSizes[i].replace(" ", "").split(/,|x/);
      adSizesArray[i] = adSizesArray[i].map(Number);
    }

    let finalAdSizesArray = [];
    adSizesArray.map((requestSizes, i) => {
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
  static removeAds() {
    this.win.googletag.destroySlots();
    this.win.jQuery(".adrequest").remove();
  }
  static adRequests(gptObject) {
    let networkID = gptObject.networkID;
    let adUnits = gptObject.adUnits;
    let adSizes = gptObject.adSizes;
    let totalAds = gptObject.totalAds;
    // get the finalAdSizesArray array
    let finalAdSizesArray = this.getAdSizes(adSizes, totalAds);
    // construct the ad hierarchy
    let hierarchy = `/${networkID}/${adUnits}`;
    console.log("HIERARCHY", hierarchy);

    //TODO set targeting for all ads

    for(let i = 0; i < finalAdSizesArray.length; i++) {
      let adSizeArray = finalAdSizesArray[i];
      console.log("Ad size array", adSizeArray);
      this.win.googletag.pubads().display(hierarchy, adSizeArray, this.adDivs[i]);
    }
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
  static slotOnLoad() {
    this.win.googletag.cmd.push(() => {
      this.win.googletag.pubads().addEventListener("slotOnload", (event) => {
        console.log('Slot has finished loading:', event);
        let adRequest = event.slot.getContentUrl();
        console.log("Ad request", adRequest);
      });
    });
  }
  static slotRenderEnded() {
    this.win.googletag.cmd.push(() => {
      this.win.googletag.pubads().addEventListener('slotRenderEnded', (event) => {

      });
    });
  }
  static init() {
    // Avoid global lookups
    this.win = window;
    this.doc = document;
    this.adDivs = [];

    this.initGPT();
    this.slotOnLoad();
  }
}

export default gptRequest;
