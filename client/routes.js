import React from "react";
import { Route, IndexRoute } from "react-router";
import gptRequest from "./utils/gptRequest";
import App from "./components/App";

const gptInit = () => {
  if(typeof window !== "undefined") {
    gptRequest.init();
  }
}

// require.ensure polyfill for node
if (typeof require.ensure !== "function") {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== "production") {
  // Require async routes only in development for react-hot-reloader to work.
  require("./components/About");
  require("./components/Features");
  require("./components/Support");
  require("./components/Contact");
  require("./components/Saved");
  require("./components/Request");
}

export default (
  <Route path="/" component={App} onEnter={gptInit}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./components/About").default);
        });
      }}
    />
    <Route
      path="features"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./components/Features").default);
        });
      }}
    />
    <Route
      path="support"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./components/Support").default);
        });
      }}
    />
    <Route
      path="contact"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./components/Contact").default);
        });
      }}
    />
    <Route
      path="generator"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./components/Saved").default);
        });
      }}
    />
    <Route
      path="request"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./components/Request").default);
        });
      }}
    />
  </Route>
);
