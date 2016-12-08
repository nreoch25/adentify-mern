import React, { Component } from "react";
import { connect } from "react-redux";

class Saved extends Component {
  getSavedRequests() {
    let saved = this.props.saved;
    // check if any saved requests in state
    if(typeof saved !== "undefined" && saved.length > 0) {
      console.log("SAVED", saved);
    }
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
