export default {
  defineGPT: ( gptObject ) => {
    return ( dispatch ) => {
      /* Start inject ad divs */
      let adReference = gptObject.reference;
      let adDivs = [];
      for(let i = 0; i < gptObject.totalAds; i++) {
        adDivs[i] = `ad-${Math.floor((Math.random() * 1000000) + 1)}`;
        console.log(adDivs[i]);
        let adDiv = document.createElement("div");
        adDiv.setAttribute("id", adDivs[i]);
        adReference.appendChild(adDiv);

      }
      /* End inject ad divs */

      /* Start ad display */
      window.googletag.cmd.push(() => {
        window.googletag.pubads().enableAsyncRendering();
        window.googletag.enableServices();
        for(let i = 0; i < gptObject.totalAds; i++) {
          window.googletag.pubads().display("/5876/home", [728, 90], adDivs[i]);
        }

        window.googletag.pubads().addEventListener('slotRenderEnded', function(event) {
          console.log('Slot has been rendered:');
          console.log(event);
          let contentURL = event.slot.getContentUrl();
          alert(contentURL);
        });
      });
      /* End ad display */
    }
  }
}
