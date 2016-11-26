import React, { Component, PropTypes } from "react";

class DisplayAd extends Component {
  componentDidMount() {
    console.log(this.props.ad);
    //TODO use googletag setContent to display ads
    // safeframe should be set to true
  }
  render() {
    return (
      <div>
        <h1>DisplayAd</h1>
      </div>
    );
  }
}

DisplayAd.propTypes = {
  ad: PropTypes.object.isRequired
};

export default DisplayAd;
