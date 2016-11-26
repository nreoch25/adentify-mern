import { fetchAdRequest } from "../actions/GptActions";

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
    this.adRequestsArray = [];
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
    console.log("ReqComponent", this.requestComponent);
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
      let isOOP = this.checkOutofpage(adSizeArray);
      if(isOOP) {
        this.win.googletag.defineOutOfPageSlot(hierarchy, this.adDivs[i])
          .addService(this.win.googletag.pubads());
      } else {
        this.win.googletag.defineSlot(hierarchy, adSizeArray, this.adDivs[i])
          .addService(this.win.googletag.pubads());
      }

      // display ad
      this.win.googletag.display(this.adDivs[i]);
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

    this.initGPT();
    this.slotRenderEnded();
  }
}

export default gptRequest;
