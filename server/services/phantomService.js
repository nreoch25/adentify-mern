import phantom from "phantom";
// TODO create an array of objects that passes back information
// TODO get Network requests

export function phantomService(filePath) {
  console.log(filePath);
  let time = Date.now();
  let options = { "web-security": "no" };
  phantom.create({ parameters: options }, (ph) => {
    console.log("ph");
    ph.createPage(function(page) {
      console.log("page");
      page.open(filePath, function(status) {
        console.log("status", status);
        if(status === "success") {
          time = Date.now() - time;
          let loadTime = time / 1000;
          console.log("LOAD TIME", loadTime);
          ph.getCookies(function(cookies) {
            console.log("COOKIES", cookies);
          });
        } else {
          console.log("PAGE FAILED TO LOAD");
        }
      });
    });
  });
}
