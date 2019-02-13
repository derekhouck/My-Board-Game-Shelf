import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';

describe('<Dashboard />', function () {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  });
});
