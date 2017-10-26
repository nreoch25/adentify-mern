import React, { Component } from "react";
import { fetchPosts, fetchPhotos } from "../actions/AppActions";
import gptStorage from "../utils/gptStorage";
import Header from "./global/Header";
import Footer from "./global/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container top-margin-large">
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
