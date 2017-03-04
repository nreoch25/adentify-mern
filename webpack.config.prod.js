var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var cssnext = require("postcss-cssnext");

module.exports = {
  devtool: "hidden-source-map",
  entry : {
    app: [
      "./client/index.js"
    ],
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "redux",
      "redux-thunk"
    ]
  },
  output: {
    path: __dirname + "/dist/public/",
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/public/"
  },
  resolve: {
    extensions: [ "", ".js", ".jsx", ".css" ],
    modules: [
      "client",
      "node_modules"
    ]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader")
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.js"
    }),
    new ExtractTextPlugin("app.[chunkhash].css", { allChunks: true }),
    new ManifestPlugin({
      basePath: "/public/"
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    })
  ],
  postcss: () => [
    cssnext({
      browsers: [ "last 2 versions", "IE > 10" ]
    })
  ]
}
