import React, { Component } from "react";
import { Link } from "react-router";

class Header extends Component {
  componentDidMount() {
    // Set the initial active class
    const currentNav = window.location.pathname.replace("/", "");
    const activeNav = ( currentNav === "" ) ? "about" : currentNav;
    window.jQuery(`#nav-${activeNav}`).addClass("active");
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <span className="navbar-brand">ADentify</span>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li id="nav-about"><Link to="/">About</Link></li>
              <li id="nav-features"><Link to="/features">Features</Link></li>
              <li id="nav-support"><Link to="/support">Support</Link></li>
              <li id="nav-contact"><Link to="/contact">Contact</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li id="nav-generator"><Link to="/generator"><span className="glyphicon glyphicon-saved right-margin"></span>Tag Generator</Link></li>
              <li id="nav-request"><Link to="/request"><span className="glyphicon glyphicon-signal right-margin"></span>Ad Request</Link></li>
            </ul>
            </div>
        </div>
      </nav>
    );
  }
}

export default Header;
