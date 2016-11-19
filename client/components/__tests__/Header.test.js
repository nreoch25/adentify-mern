import { expect } from "chai";
import React from "react";
import { shallow } from "enzyme";
import Header from "../global/Header";

describe("Header", () => {
  it("should render", () => {
    const wrapper = shallow(<Header />);
  });
  it("should have a class of navbar-fixed-top", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".navbar").hasClass("navbar-fixed-top")).to.equal(true);
  });
  it("should render two .nav lists", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".nav")).to.have.length(2);
  });
});
