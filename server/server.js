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

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(express.static(path.resolve(__dirname, "../dist")));

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  return `
    <!DOCTYPE HTML>
    <html>
      <head>
      </head>
      <body>
        <div id="root">${html}</div>
        <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
        <script src="/app.js"></script>
      </body>
    </html>
  `;
};

// Server side Rendering based on routes matched by react-router
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if(err) {
      return res.status(500);
    }
    if(redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    if(!renderProps) {
      return next();
    }
    const store = configureStore();

    //TODO implement fetchComponentData for Server side rendering
  })
});

// Express setup
app.use((req, res, next) => {
  res.send({"hello": "world"});
})

app.listen(serverConfig.port, (error) => {
  if(!error) {
    console.log(`Adentify is running on port: ${serverConfig.port}`);
  }
});
