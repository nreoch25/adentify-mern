import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import gptRequest from "../utils/gptRequest";
import GptActions from "../actions/GptActions";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = { totalAds : 1 }
    this.adRequest = this.adRequest.bind(this);
    this.adjustTotalAds = this.adjustTotalAds.bind(this);
  }
  componentDidMount() {
    this.toggleModal();
  }
  componentWillReceiveProps() {
    this.toggleModal();
  }
  toggleModal() {
    window.jQuery("#myModal").modal("toggle");
  }
  adjustTotalAds() {
    let totalAds = this.refs.totalAds.value;
    this.setState({ totalAds: totalAds});
  }
  totalAds() {
    let { totalAds } = this.state;
    let adSizes = [];
    for(let i = 0; i < totalAds; i++) {
      let adSizesRef = `adSizes${i}`
      adSizes.push(
        <fieldset key={i} className="form-group">
          <label>Ad Sizes: Excepts multiple sizes</label>
          <input  ref={adSizesRef} className="form-control" placeholder="example. 728x90, 300x250, 1x1" required />
        </fieldset>
      );
    }
    return adSizes;
  }
  getAdSizes() {
    let totalAds = this.refs.totalAds.value;
    let adSizesArray = [];
    for(let i = 0; i < totalAds; i++) {
      let curRef = `adSizes${i}`;
      adSizesArray.push(this.refs[curRef].value);
    }
    return adSizesArray;
  }
  adRequest(evt) {
    evt.preventDefault();
    let adSizes = this.getAdSizes();
    let gptObject = {
      networkID: this.refs.networkID.value,
      adUnits: this.refs.adUnits.value,
      totalAds: this.refs.totalAds.value,
      adSizes: adSizes,
      reference: this.refs.adDisplay
    };

    // TODO check if form is valid

    gptRequest.gptElements(gptObject);
    gptRequest.adRequests(gptObject);

    // hide request form
    this.toggleModal();
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
                  <fieldset className="form-group">
                    <label>Total Number of Ads:</label>
                    <select ref="totalAds" className="form-control" onChange={this.adjustTotalAds}>
                      <option defaultValue>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </fieldset>
                  { this.totalAds() }
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
