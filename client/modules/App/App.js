import React, { Component } from "react";
import { fetchData } from "../../actions/AppActions";

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.need = [() => { return fetchData(); }];
