import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import IntlWrapper from "../client/modules/Intl/IntlWrapper";

// Webpack Requirements
import webpack from "webpack";
import config from "../webpack.config.dev.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

// Initialize the Express app
const app = new express();

// Run Webpack dev server in development mode
if(process.env.NODE_ENV = "development") {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, colors: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React and Redux setup
import { configureStore } from "../client/store";
import { Provider } from "react-redux";
import React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";

// Import required modules
import routes from "../client/routes";
import serverConfig from "./config";

// Express setup
app.use((req, res, next) => {
  res.send({"hello": "world"});
})

app.listen(serverConfig.port, (error) => {
  if(!error) {
    console.log(`Adentify is running on port: ${serverConfig.port}`);
  }
});
