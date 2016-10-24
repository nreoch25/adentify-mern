import React, { Component } from "react";
import { fetchPosts, fetchPhotos } from "../../actions/AppActions";

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.need = [
  () => { return fetchPosts(); },
  () => { return fetchPhotos(); }
];

export default App;
