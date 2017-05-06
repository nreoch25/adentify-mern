import React, { Component, PropTypes } from "react";
import gptRequest from "../utils/gptRequest";

class DisplayInfo extends Component {
  componentDidMount() {
    let infoObject = this.props.info;
    console.log("INFO OBJECT", infoObject);
  }
  getAdInformation() {
    // deconstruct infoObject
    let { cookies, loadTime, networkRequests } = this.props.info;
    let cookiesArray = [];
    cookies.map((cookie) => {
      cookiesArray.push(
        <ul className="list-group">
          <li className="list-group-item">Domain: {cookie.domain}</li>
          <li className="list-group-item">Name: {cookie.name}</li>
          <li className="list-group-item">Value: {cookie.value}</li>
        </ul>
      );
    });
    return (
      <div>
      <h2 className="top-margin-small bottom-margin-small"><span className="label label-success">Load Time: {loadTime} seconds</span></h2>
        <h2 className="top-margin-small bottom-margin-small"><span className="label label-warning">Cookies</span></h2>
        {cookiesArray}
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.getAdInformation()}
      </div>
    );
  }
}

DisplayInfo.propTypes = {
  info: PropTypes.object.isRequired
};

export default DisplayInfo;
