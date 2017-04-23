import phantom from "phantom";
// TODO create an array of objects that passes back information
// TODO get Network requests / look more into getting cookies

export function phantomService(filePath) {
  console.log("PHANTOM", filePath);
  let time = Date.now();
  let _ph, _page;
  phantom.create((ph) => {
    _ph = ph;
    ph.createPage((page) => {
        _page = page;
        page.open(filePath, (status) => {
          if(status !== "success") {
            console.log("FAILED to load the address");
          } else {
            time = Date.now() - time;
            console.log("LOAD TIME", time / 1000);
            _ph.getCookies((cookies) => {
              console.log(cookies);
            });
            _page.close();
            _ph.exit();
          }
        });
    });
  });
  /*let time = Date.now();
  phantom.create().then(ph => {
    _ph = ph;
    return ph.createPage();
  }).then(page => {
    _page = page;
    return page.open(filePath);
  }).then(status => {
    if(status !== "success") {
      console.log("FAILED to load the address");
    } else {
      time = Date.now() - time;
      console.log("LOAD TIME", time / 1000);
      return _page.property("cookies");
    }
  }).then(cookies => {
    console.log(cookies);
    _page.close();
    _ph.exit();
  });*/
}
