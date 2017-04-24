import phantom from "phantom";
// TODO create an array of objects that passes back information
// TODO get Network requests

export function phantomService(filePath) {
  console.log("PHANTOM", filePath);
  let _ph, _page;
  let time = Date.now();
  phantom.create((ph) => {
    console.log("ph");
    ph.createPage(function(page) {
      console.log("page");
      page.open(filePath, function(status) {
        console.log("status", status);
        time = Date.now() - time;
        let loadTime = time / 1000;
        console.log("LOAD TIME", loadTime);
        ph.getCookies(function(cookies) {
          console.log("COOKIES", cookies);
        });
      });
    });
  });
}
