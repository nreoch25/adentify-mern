import React, { Component } from "react";
import { connect } from "react-redux";

class Saved extends Component {
  getSavedRequests() {
    let saved = this.props.saved;
    let savedRequests = [];
    // check if any saved requests in state
    if(typeof saved !== "undefined" && saved.length > 0) {
      saved.map((request, i) => {
        savedRequests.push(
          <div key={i} className="well well-lg adrequest">
            <h3 className="no-vertical-margin">{request.name}</h3>
            <button className="btn btn-info top-margin-small">Submit Request</button>
          </div>
        );
      });
      return savedRequests;
    }
  }
  render() {
    return (
      <div>
        <h1>Saved Requests</h1>
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
