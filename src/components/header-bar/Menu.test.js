import React from 'react';
import { shallow } from 'enzyme';
import Menu from './Menu';

describe('<Menu />', function () {
  it('renders without crashing', () => {
    shallow(<Menu />);
  });
});
