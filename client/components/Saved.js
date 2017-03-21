import React, { Component } from "react";
import { connect } from "react-redux";
import gptRequest from "../utils/gptRequest";
import gptStorage from "../utils/gptStorage";
import { saveSubmittedRequest, updateSavedResponses } from "../actions/GptActions";

class Saved extends Component {
  constructor(props) {
    super(props);

    this.submitSavedRequest = this.submitSavedRequest.bind(this);
    this.deleteSavedRequest = this.deleteSavedRequest.bind(this);
  }
  deleteSavedRequest(evt) {
    let requestName = evt.currentTarget.previousSibling.previousSibling.innerText;
    console.log("DELETE", requestName);
    let saved = this.props.saved;
    let newSavedRequests = saved.filter((save) => {
      if(save.name !== requestName) { return save }
    });
    // overwrite with filtered array
    gptStorage.overwriteItem("adentify_adRequests", newSavedRequests);
    // update redux saved state
    this.props.updateSavedResponses(newSavedRequests);
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
            <button className="btn btn-success top-margin-small right-margin" onClick={this.submitSavedRequest}>Submit Request</button>
            <button className="btn btn-danger top-margin-small" onClick={this.deleteSavedRequest}>Delete Request</button>
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

export default connect(mapStateToProps, { saveSubmittedRequest, updateSavedResponses })(Saved);
