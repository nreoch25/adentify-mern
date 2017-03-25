import React, { Component } from "react";
import logo from "../images/adentify.png";

class About extends Component {
  render() {
    return (
      <div className="logo-header-container">
        <div className="logo-header-content">
          <img className="logo-header-image" src={logo} />
          <div className="logo-header-text">dentify</div>
        </div>
      </div>
    );
  }
}

export default About;
