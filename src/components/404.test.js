import React from "react";
import { shallow } from "enzyme";
import NotFound from "./404";

describe("<NotFound />", () => {
  it("renders without crashing", () => {
    shallow(<NotFound />);
  });
});
