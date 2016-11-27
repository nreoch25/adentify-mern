import React, { Component, PropTypes } from "react";
import gptRequest from "../utils/gptRequest";

class DisplayAd extends Component {
  componentDidMount() {
    let adObject = this.props.ad;
    let reference = this.refs.advertisement;
    gptRequest.setDisplayContent(adObject, reference);
    //TODO use googletag setContent to display ads
    // safeframe should be set to true
  }
  render() {
    return (
      <iframe ref="advertisement" src="about:blank" scrolling="no" marginWidth="0" marginHeight="0" frameBorder="no"></iframe>
    );
  }
}

DisplayAd.propTypes = {
  ad: PropTypes.object.isRequired
};

export default DisplayAd;
