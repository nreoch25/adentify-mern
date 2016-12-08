import React, { Component } from "react";
import { connect } from "react-redux";

class Saved extends Component {
  getSavedRequests() {
    console.log(this.props.saved);
  }
  render() {
    return (
      <div>
        <h1>Saved Tags</h1>
        { this.getSavedRequests() }
      </div>
    );
  }
}

// Redux setup
function mapStateToProps(state) {
  return {
    saved : state.gpt.saved
  }
}

export default connect(mapStateToProps, null)(Saved);
