/* App Entry Script */

if(process.env.NODE_ENV === "production") {
  process.env.webpackAssets = JSON.stringify(require("./dist/public/manifest.json"));
  process.env.webpackChunkAssets = JSON.stringify(require("./dist/public/chunk-manifest.json"));
  // In production serve the webpack server file
  require("./dist/server.bundle.js");
} else {

  require("babel-register");
  require("babel-polyfill");
  require("./server/server");

}
