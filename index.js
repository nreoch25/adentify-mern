/* App Entry Script */

if(process.env.NODE_ENV === "production") {

} else {

  require("babel-register")({
    "plugins" : [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require("babel-polyfill");
  require("./server/server");

}
