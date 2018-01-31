import React, { Component } from "react";
import Logo from "./global/Logo";

class About extends Component {
  render() {
    return (
      <div>
        <Logo />
        <div className="panel panel-default top-margin-large">
          <div className="panel-heading">
            <h2 className="top-margin-xsmall">
              <span className="label label-info">About Adentify</span>
            </h2>
          </div>
          <div className="panel-body">
            <p>
              Adentify is an online advertising ad-tag debugging tool for web
              publishers leveraging the GPT ad tagging library and DFP. Our app
              will allow publishers to see what's really going on behind the
              scenes of their ad calls. We have extensive experience in the
              online advertising industry and know what information is valuable
              to publishers. Find out important information like ad load time,
              what cookies are being stored on your users browser and more. For
              an optimal user-experience please use the Chrome browser on a
              Desktop or Laptop computer.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
