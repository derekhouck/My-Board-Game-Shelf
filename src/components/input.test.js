import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

describe('<HeaderBar />', function () {
  it('renders without crashing', () => {
    shallow(<Input meta={{}} input={{}} />);
  });
});
