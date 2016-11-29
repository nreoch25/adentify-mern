class gptRequest {
  static emptyResponse(ref) {
    // return an empty adserver response
    let response = this.doc.createElement("h3");
    let responseText = this.doc.createTextNode("Empty Ad Response");
    response.appendChild(responseText);
    ref.parentNode.appendChild(response);
    ref.setAttribute("width", "0");
    ref.setAttribute("height", "0");
  }
  static setDisplayContent(ad, ref) {
    console.log("AD", ad, "REF", ref);
    // check if ad return is empty
    console.log("HIERARCHY", this.hierarchy);
    if(ad[this.hierarchy]._empty_ === true) {
      console.log("NO AD AVAILABLE");
      this.emptyResponse(ref);
    } else {
      // set the ad size array
      let adSizes = [];
      adSizes[0] = ad[this.hierarchy]._width_;
      adSizes[1] = ad[this.hierarchy]._height_;
      console.log(adSizes);

      // display the content in an the iframe reference
      let iframeContainer = ref;
      let iframeDocument = iframeContainer.contentWindow.document;
      // set the width and height based on adSize
      iframeContainer.setAttribute("width", adSizes[0]);
      iframeContainer.setAttribute("height", adSizes[1]);
      // get the ad content
      let content = ad[this.hierarchy]._html_;
      // inject the ad content into the ad iframe
      iframeDocument.open();
      iframeDocument.write(content);
      iframeDocument.close();

    }
  }
  static gptElements(gptObject) {
    // create ad containers based on total Ads number
    let adReference = gptObject.reference;
    for(let i = 0; i < gptObject.totalAds; i++) {
      this.adDivs[i] = `ad-${Math.floor((Math.random() * 1000000) + 1)}`;
      let adDiv = document.createElement("div");
      adDiv.setAttribute("id", this.adDivs[i]);
      adReference.appendChild(adDiv);
    }
  }
  static getAdSizes(adSizes, totalAds) {
    // take adSizes array
    // return gpt usable arrays
    let adSizesArray = [];
    for(let i = 0; i < totalAds; i++) {
      adSizesArray[i] = adSizes[i].replace(" ", "").split(/,|x/);
      adSizesArray[i] = adSizesArray[i].map(Number);
    }

    let finalAdSizesArray = [];
    adSizesArray.map((requestSizes, i) => {
      finalAdSizesArray[i] = [];
      // recursive function that takes first two sizes
      // stores them in the final array
      // checks if there are two numbers left
      // if not it returns
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
    // destroy gpt slots
    this.win.googletag.destroySlots();
    // remove and clear hidden gpt display ads
    this.win.jQuery(".adrequest").remove();
    this.adRequestsArray = [];
    this.adDivs = [];
    // remove adentify api ads
    this.win.jQuery("#adResponses").empty();
    // reset redux state
    this.requestComponent.resetAdRequests();

  }
  static checkOutofpage(adSizes) {
    // check if 1x1 and return true
    if(adSizes.length === 1) {
      let width = adSizes[0][0];
      let height = adSizes[0][1];
      if(width === 1 && height === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
  static adRequests(gptObject, component) {
    this.requestComponent = component;
    let networkID = gptObject.networkID;
    let adUnits = gptObject.adUnits;
    let adSizes = gptObject.adSizes;
    let totalAds = gptObject.totalAds;
    // get the finalAdSizesArray array
    let finalAdSizesArray = this.getAdSizes(adSizes, totalAds);
    // construct the ad hierarchy
    this.hierarchy = `/${networkID}/${adUnits}`;

    //TODO set targeting for all ads

    for(let i = 0; i < finalAdSizesArray.length; i++) {
      let adSizeArray = finalAdSizesArray[i];
      let slot;
      let isOOP = this.checkOutofpage(adSizeArray);
      if(isOOP) {
        slot = this.win.googletag.defineOutOfPageSlot(this.hierarchy, this.adDivs[i])
          .addService(this.win.googletag.pubads());
      } else {
        slot = this.win.googletag.defineSlot(this.hierarchy, adSizeArray, this.adDivs[i])
          .addService(this.win.googletag.pubads());
      }

      // display ad
      this.win.googletag.display(this.adDivs[i]);
      this.win.googletag.pubads().refresh([slot], {changeCorrelator: false});
    }
  }
  static initGPT() {
    // init gpt object
    this.win.googletag = this.win.googletag || {};
    this.win.googletag.cmd = this.win.googletag.cmd || [];

    this.win.googletag.cmd.push(() => {
      //set gpt rules
      this.win.googletag.pubads().disableInitialLoad();
      this.win.googletag.pubads().enableAsyncRendering();
      this.win.googletag.enableServices();
    });
  }
  static slotRenderEnded() {
    this.win.googletag.cmd.push(() => {
      this.win.googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        let adRequest = event.slot.getContentUrl();
        // pass the contentURl / Adrequest to the Request Component
        this.adRequestsArray.push(adRequest);
        if(this.adRequestsArray.length === this.adDivs.length) {
          this.requestComponent.collectAdRequests(this.adRequestsArray);
        }
      });
    });
  }
  static init() {
    // Avoid global lookups
    this.win = window;
    this.doc = document;

    this.adDivs = [];
    this.adRequestsArray = [];
    this.requestComponent = null;
    this.hierarchy = null;

    this.initGPT();
    this.slotRenderEnded();
  }
}

export default gptRequest;
