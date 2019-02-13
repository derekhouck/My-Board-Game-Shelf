import React from 'react';
import { shallow } from 'enzyme';
import MenuButton from './menu-button';

describe('<MenuButton />', function () {
  it('renders without crashing', () => {
    shallow(<MenuButton />);
  });
});
