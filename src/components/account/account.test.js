import React from 'react';
import { shallow } from 'enzyme';
import { Account } from './account';

describe('<Account />', function () {
  it('renders without crashing', () => {
    shallow(<Account currentUser={{}} />);
  });
});
