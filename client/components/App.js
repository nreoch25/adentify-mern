import React, { Component } from "react";
import { fetchPosts, fetchPhotos } from "../actions/AppActions";
import Header from "./global/Header";

class App extends Component {
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
