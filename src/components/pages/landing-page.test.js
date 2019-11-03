import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from './landing-page';

describe('<LandingPage />', function () {
  it('renders without crashing', () => {
    shallow(<LandingPage />);
  });
});
