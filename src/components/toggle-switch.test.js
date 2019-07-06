import React from "react";
import { shallow } from "enzyme";
import ToggleSwitch from './toggle-switch';

describe("<ToggleSwitch />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ToggleSwitch />);
    expect(wrapper).toMatchSnapshot();
  });
});