import React from 'react';
import { shallow } from 'enzyme';
import Button from './button';

describe('<Button />', function () {
  it('renders without crashing', () => {
    shallow(<Button />);
  });
});
