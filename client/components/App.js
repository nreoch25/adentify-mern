import React, { Component } from "react";
import { fetchPosts, fetchPhotos } from "../actions/AppActions";
import gptStorage from "../utils/gptStorage";
import Header from "./global/Header";

class App extends Component {
  componentDidMount() {
    gptStorage.init();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container top-margin">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.need = [
  () => { return fetchPosts(); },
  () => { return fetchPhotos(); }
];

export default App;
