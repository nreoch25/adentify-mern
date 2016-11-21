import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import gptSetup from "../utils/gptSetup";
import GptActions from "../actions/GptActions";

class Request extends Component {
  constructor(props) {
    super(props);
    this.adRequest = this.adRequest.bind(this);
  }
  componentDidMount() {
    gptSetup.init();
    this.toggleModal();
    /*this.props.gptActions.defineGPT({
      networkID : "5876",
      adUnits : "home",
      tagType : "async",
    });*/
  }
  componentWillReceiveProps() {
    this.toggleModal();
  }
  toggleModal() {
    window.jQuery("#myModal").modal("toggle");
  }
  adRequest(evt) {
    evt.preventDefault();
    let gptObject = {};
    gptObject.networkID = this.refs.networkID.value;
    gptObject.singleRequest = true;
    gptObject.totalAds = 3;
    gptObject.AdSizes = [
      [ "728x90" ],
      [ "300x250" ]
    ];
    gptObject.adUnits = this.refs.adUnits.value;
    gptObject.reference = this.refs.adDisplay;
    // TODO check if form is valid and hide modal
    this.toggleModal();
    this.props.gptActions.defineGPT(gptObject);
  }
  render() {
    return (
      <div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Make an Ad Request</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={this.adRequest}>
                  <fieldset className="form-group">
                    <label>Network ID:</label>
                    <input ref="networkID" className="form-control" placeholder="example. 1234" required />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Ad Units:</label>
                    <input ref="adUnits" className="form-control" placeholder="example. sports/football/nfl" required />
                  </fieldset>
                  <button action="submit" className="btn btn-primary right-margin">Submit Request</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div ref="adDisplay"></div>
      </div>
    );
  }
}

// Redux setup
const mapStateToProps = ( state ) => ({ ...state });
const mapDispatchToProps = ( dispatch ) => ({
  gptActions: bindActionCreators(GptActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
