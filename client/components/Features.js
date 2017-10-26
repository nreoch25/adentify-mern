import React, { Component } from "react";
import Logo from "./global/Logo";

class Features extends Component {
  render() {
    return (
      <div>
        <Logo />
        <div className="panel panel-default top-margin-large">
          <div className="panel-heading">
            <h2 className="top-margin-xsmall">
              <span className="label label-info">Adentify Features</span>
            </h2>
          </div>
          <div className="panel-body">
            <ul>
              <li>
                Multiple ad requests using GPT Single Request Architecture
              </li>
              <li>Submit multiple ad sizes per ad request</li>
              <li>Attach key-value targeting to all your ad requests</li>
              <li>Save individual ad requests for future use</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Features;
