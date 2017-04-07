import React, { Component } from "react";
import Logo from "./global/Logo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import gptRequest from "../utils/gptRequest";
import gptStorage from "../utils/gptStorage";
import { fetchAdRequests, resetAdResponses, saveAdRequests, resetSavedResponses } from "../actions/GptActions";
import DisplayAd from "./DisplayAd";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = { totalAds : 1, saveRequest: false }
    this.adRequests = [];
    this.saveAds = false;
    this.requestName = "";
    this.adHierarchy = "";
    this.adRequest = this.adRequest.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.adjustTotalAds = this.adjustTotalAds.bind(this);
    this.showRequestName = this.showRequestName.bind(this);
  }
  componentDidMount() {
    // display request menu on component mounting
    //this.toggleModal();
    let submitted = this.props.submitted;
    console.log("submitted", submitted);
    if(submitted.length > 0) {
      console.log("SUBMITTED", submitted);
      this.props.fetchAdRequests(submitted[0].requests);
    }
  }
  componentWillUnmount() {
    // check if any ads in state
    // remove ads on component unmount
    if(this.props.ads.length > 0 || this.props.submitted.length > 1) {
      this.removeAds();
    }
  }
  removeAds() {
    gptRequest.removeAds();
    this.props.resetAdResponses();
    this.props.resetSavedResponses();
  }
  toggleModal() {
    window.jQuery("#myModal").modal("toggle");
  }
  adjustTotalAds() {
    // reset state to new ad Total
    let totalAds = this.refs.totalAds.value;
    this.setState({ totalAds: totalAds});
  }
  totalAds() {
    // based on total ads add new
    // input boxes for ad sizes
    let { totalAds } = this.state;
    let adSizes = [];
    for(let i = 0; i < totalAds; i++) {
      let adSizesRef = `adSizes${i}`
      adSizes.push(
        <fieldset key={i} className="form-group">
          <label>Ad Sizes: Excepts multiple sizes</label>
          <input  ref={adSizesRef} className="form-control" placeholder="example. 728x90, 300x250, (1x1 for outofpage)" required />
        </fieldset>
      );
    }
    return adSizes;
  }
  showRequestName() {
    // check if ad requests should be saved
    if(this.refs.saved.checked) {
      this.setState({ saveRequest: true });
    } else {
      this.setState({ saveRequest: false });
    }
  }
  saveRequest() {
    // saveRequest is checked true
    // display RequestName input or return null
    if(this.state.saveRequest === true) {
      return (
        <fieldset ref="requestContainer" className="form-group">
          <label>Ad Request Name</label>
          <input  ref="requestName" className="form-control" placeholder="example. [PublisherName] - sports - 728x90 | 300x250" required />
        </fieldset>
      );
    } else {
      return null;
    }
  }
  getAdSizes() {
    // create adSizes Array based on totalAds.value
    // and curRef for adSizes
    let totalAds = this.refs.totalAds.value;
    let adSizesArray = [];
    for(let i = 0; i < totalAds; i++) {
      let curRef = `adSizes${i}`;
      adSizesArray.push(this.refs[curRef].value);
    }
    return adSizesArray;
  }
  resetAdRequests() {
    // reset ad Responses on new form request
    this.props.resetAdResponses();
  }
  resetSubmitRequests() {
    // reset ad Responses requests from saved
    this.props.resetSavedResponses();
  }
  collectAdRequests(adRequests) {
    // fetch adRequests using isomorphic fetch
    this.props.fetchAdRequests(adRequests);
    // if saveAds is checked store into localStorage
    if(this.saveAds === true) {
      console.log("REQUEST NAME", this.requestName);
      let curRequest = {};
      curRequest.name = this.requestName;
      curRequest.requests = adRequests;
      curRequest.hierarchy = this.adHierarchy;
      gptStorage.setItem("adentify_adRequests", curRequest);
      let items = gptStorage.getItem("adentify_adRequests");
      this.props.saveAdRequests(JSON.parse(items));
    }
  }
  adRequest(evt) {
    evt.preventDefault();
    //remove old ads if they exist
    if(this.props.ads.length > 0 || this.props.submitted.length > 0) {
      this.removeAds();
    }
    let adSizes = this.getAdSizes();

    // TODO set target keyvalues

    let gptObject = {
      networkID: this.refs.networkID.value,
      adUnits: this.refs.adUnits.value,
      totalAds: this.refs.totalAds.value,
      adSizes: adSizes,
      reference: this.refs.adDisplay
    };

    // check if ad requests should be saved
    if(this.refs.saved.checked) {
      this.saveAds = true;
      this.requestName = this.refs.requestName.value;
      this.adHierarchy = `/${gptObject.networkID}/${gptObject.adUnits}`;
    }

    // TODO check if form is valid

    gptRequest.gptElements(gptObject);
    gptRequest.adRequests(gptObject, this);


    // hide request form
    this.toggleModal();
  }
  displayAdResponses() {
    let ads = this.props.ads;
    console.log("ADS", this.props.ads);
    let displayAds = [];
    // check if any ads in state
    if(typeof ads !== "undefined" && ads.length > 0) {
      ads.map((ad, i) => {
        displayAds.push(
          <div key={i} className="well well-lg adrequest">
            <DisplayAd ad={ad} />
          </div>
        );
      });
      return displayAds;
    }
  }
  displayModal() {
    this.toggleModal();
  }
  render() {
    return (
      <div>
        <Logo />
        <div className="panel panel-default top-margin-large">
          <div className="panel-heading">
            <h2 className="top-margin-xsmall"><span className="label label-info">Adentify Request</span></h2>
          </div>
          <div className="panel-body">
            <button className="btn btn-default top-margin-xsmall" onClick={this.displayModal}>Display Ad Request Form</button>
          </div>
        </div>
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
                  { this.saveRequest() }
                  <fieldset className="form-group">
                    <label><input ref="saved" type="checkbox" onChange={this.showRequestName} />&nbsp;&nbsp;&nbsp;Save Ad Request</label>
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
        <div ref="adDisplay" id="adRequests" style={{"display": "none"}}></div>
        <div ref="adResponses" id="adResponses">
          { this.displayAdResponses() }
        </div>
      </div>
    );
  }
}

// Redux setup
function mapStateToProps(state) {
  return {
    ads : state.gpt.ads,
    submitted: state.gpt.submitted
  }
}

export default connect(mapStateToProps, { fetchAdRequests, resetAdResponses, saveAdRequests, resetSavedResponses })(Request);
