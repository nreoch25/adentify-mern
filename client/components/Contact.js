import React, { Component } from "react";
import Logo from "./global/Logo";

class Contact extends Component {
  render() {
    return (
      <div>
        <Logo />
        <div className="panel panel-default top-margin-large">
          <div className="panel-heading">
            <h2 className="top-margin-xsmall"><span className="label label-info">Contact Adentify</span></h2>
          </div>
          <div className="panel-body">Contact Adentify content</div>
        </div>
      </div>
    );
  }
}

export default Contact;
