import React, { Component } from "react";
import Logo from "./global/Logo";


class About extends Component {
  render() {
    return (
      <div>
        <Logo />
        <div className="panel panel-default top-margin-large">
          <div className="panel-heading">
            <h2 className="top-margin-xsmall"><span className="label label-info">About Adentify</span></h2>
          </div>
          <div className="panel-body">About Adentify content</div>
        </div>
      </div>
    );
  }
}

export default About;
