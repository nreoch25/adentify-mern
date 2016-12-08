import React from "react";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import gptStorage from "./utils/gptStorage";
import { saveAdRequests } from "./actions/GptActions";

// Import routes
import routes from "./routes";

// Base stylesheet
require("./styles/main.css");

// Set the Navbar active class
browserHistory.listen((evt) => {
  const currentNav = evt.pathname.replace("/", "");
  const activeNav = ( currentNav === "" ) ? "about" : currentNav;
  window.jQuery(".navbar li.active").removeClass("active");
  window.jQuery(`#nav-${activeNav}`).addClass("active");
});

function initSavedRequests(store) {
  // init gpt storage
  gptStorage.init();
  let items = gptStorage.getItem("adentify_adRequests");
  if(items !== null) {
    store.dispatch(saveAdRequests(JSON.parse(items)));
  }
}

export default function App(props) {
  console.log("STORE", props.store);
  // init saved request state
  if(typeof window !== "undefined") {
    initSavedRequests(props.store);
  }

  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired
}
