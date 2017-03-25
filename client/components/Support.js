import React, { Component } from "react";
import Logo from "./global/Logo";

class Support extends Component {
  render() {
    return (
      <div>
        <Logo />
        <div className="panel panel-default top-margin-large">
          <div className="panel-heading">
            <h2 className="top-margin-xsmall"><span className="label label-info">Adentify Support</span></h2>
          </div>
          <div className="panel-body">Adentify Support content</div>
        </div>
      </div>
    );
  }
}

export default Support;
