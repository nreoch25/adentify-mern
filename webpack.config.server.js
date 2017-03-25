var fs = require("fs");
var path = require("path");
var ExternalsPlugin = require("webpack-externals-plugin");

module.exports = {

  entry: path.resolve(__dirname, "server/server.js"),
  output: {
    path: __dirname + "/dist/",
    filename: "server.bundle.js",
  },
  target: "node",
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new ExternalsPlugin({
      type: "commonjs",
      include: path.join(__dirname, "./node_modules/")
    })
  ]
};
