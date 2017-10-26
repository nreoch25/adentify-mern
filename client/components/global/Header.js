import React, { Component } from "react";
import { Link } from "react-router";

import logo from "../../images/adentify.png";

class Header extends Component {
  componentDidMount() {
    // Set the initial active class
    const currentNav = window.location.pathname.replace("/", "");
    const activeNav = currentNav === "" ? "about" : currentNav;
    window.jQuery(`#nav-${activeNav}`).addClass("active");
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li id="nav-about">
                <Link to="/">About</Link>
              </li>
              <li id="nav-features">
                <Link to="/features">Features</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li id="nav-saved">
                <Link to="/saved">
                  <span className="glyphicon glyphicon-saved right-margin" />Saved
                  Requests
                </Link>
              </li>
              <li id="nav-request">
                <Link to="/request">
                  <span className="glyphicon glyphicon-signal right-margin" />Ad
                  Request
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
