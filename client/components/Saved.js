import React, { Component } from "react";
import { connect } from "react-redux";
import gptRequest from "../utils/gptRequest"
import { saveSubmittedRequest } from "../actions/GptActions";

class Saved extends Component {
  constructor(props) {
    super(props);

    this.submitSavedRequest = this.submitSavedRequest.bind(this);
  }
  submitSavedRequest(evt) {
    let requestName = evt.currentTarget.previousSibling.innerText;
    let saved = this.props.saved;
    let submittedRequest = saved.filter((save) => {
      if(save.name === requestName) { return save };
    });
    gptRequest.setSubmittedHierarchy(submittedRequest[0].hierarchy);
    this.props.saveSubmittedRequest(submittedRequest);
  }
  getSavedRequests() {
    let saved = this.props.saved;
    let savedRequests = [];
    // check if any saved requests in state
    if(typeof saved !== "undefined" && saved.length > 0) {
      saved.map((request, i) => {
        savedRequests.push(
          <div key={i} className="well well-lg adrequest">
            <h3 className="no-vertical-margin">{request.name}</h3>
            <button className="btn btn-info top-margin-small" onClick={this.submitSavedRequest}>Submit Request</button>
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

export default connect(mapStateToProps, { saveSubmittedRequest })(Saved);
