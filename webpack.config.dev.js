var webpack = require("webpack");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    app: [
      "webpack-hot-middleware/client",
      "webpack/hot/only-dev-server",
      "react-hot-loader/patch",
      "./client/index.js"
    ]
  },
  output: {
    path: __dirname,
    filename: "app.js",
    publicPath: "http://0.0.0.0:8000/"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modules: [
      "client",
      "node_modules"
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        CLIENT: JSON.stringify(true),
        "NODE_ENV": JSON.stringify("development")
      }
    })
  ]
};
