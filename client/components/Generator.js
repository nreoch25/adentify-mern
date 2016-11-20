import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GptActions from "../actions/GptActions";
import gptSetup from "../utils/gptSetup";

// Redux setup
const mapStateToProps = ( state ) => ({ ...state });
const mapDispatchToProps = ( dispatch ) => ({
  gptActions: bindActionCreators(GptActions, dispatch)
});

class Generator extends Component {
  componentDidMount() {
    gptSetup.init();
    this.props.gptActions.defineGPT({
      networkID : "5876",
      adUnits : "home",
      tagType : "async",
    });
  }
  render() {
    return (
      <div>
        <h1>Tag Generator</h1>
        <div id="test1"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generator);
