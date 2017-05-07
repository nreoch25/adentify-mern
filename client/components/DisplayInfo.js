import React, { Component, PropTypes } from "react";
import gptRequest from "../utils/gptRequest";

class DisplayInfo extends Component {
  componentDidMount() {
    let infoObject = this.props.info;
    console.log("INFO OBJECT", infoObject);
  }
  getHierarchyRoot() {
    let hierarchy;
    for(var key in this.props.ad) {
      hierarchy = key;
      return hierarchy;
    }
  }
  getAdInformation() {
    // deconstruct infoObject
    let { cookies, loadTime, networkRequests } = this.props.info;
    let hierarchyRoot = this.getHierarchyRoot();
    let { _width_, _height_, _campaign_ids_, _adgroup2_ids_, _creative_ids_ } = this.props.ad[hierarchyRoot];
    let cookiesArray = [];
    let networkRequestsArray = [];
    cookies.map((cookie, i) => {
      cookiesArray.push(
        <ul className="list-group" key={i}>
          <li className="list-group-item">Domain: {cookie.domain}</li>
          <li className="list-group-item">Name: {cookie.name}</li>
          <li className="list-group-item">Value: {cookie.value}</li>
        </ul>
      );
    });
    networkRequests.map((networkRequest, i) => {
      networkRequestsArray.push(<li className="list-group-item" key={i}>{networkRequest}</li>);
    });
    return (
      <div>
        <h2 className="top-margin-small bottom-margin-small"><span className="label label-default">Ad Information</span></h2>
          <ul className="list-group">
            <li className="list-group-item">Size: {_width_}x{_height_}</li>
            <li className="list-group-item">Campaign ID: {_campaign_ids_[0]}</li>
            <li className="list-group-item">Line item ID: {_adgroup2_ids_[0]}</li>
            <li className="list-group-item">Creative ID: {_creative_ids_[0]}</li>
          </ul>
        <h2 className="top-margin-small bottom-margin-small"><span className="label label-default">Load Time: {loadTime} seconds</span></h2>
        <h2 className="top-margin-small bottom-margin-small"><span className="label label-default">Cookies</span></h2>
        {cookiesArray}
        <h2 className="top-margin-small bottom-margin-small"><span className="label label-default">Network Requests</span></h2>
        <div className="list-group">
          {networkRequestsArray}
        </div>
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
  ad: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

export default DisplayInfo;
