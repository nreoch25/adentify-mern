export default {
  defineGPT: ( gptObject ) => {
    return ( dispatch ) => {
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      window.googletag.cmd.push(() => {
        //window.googletag.defineSlot("/5876/home", [728, 90], "test1").addService(window.googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().enableAsyncRendering();
        googletag.enableServices();
        window.googletag.pubads().display("/5876/home", [728, 90], "test1");
      });
      window.googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        console.log('Slot has been rendered:');
        console.log(event);
        let contentURL = event.slot.getContentUrl();
        console.log(contentURL);
      });
    }
  }
}
