import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import App from "./App";
import { LandingPage } from "./components/landing-page";
import NotFound from "./components/404";
import store from "./store";

describe("<App />", function() {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("redirects to landing page when given root path", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(LandingPage)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it("redirects to the 404 page when given an invalid path", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/thispagedoesnotexist"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(LandingPage)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });
});
