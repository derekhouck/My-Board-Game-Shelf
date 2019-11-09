import React from 'react';
import { shallow } from 'enzyme';
import Loading from './loading';

describe('<Loading />', function () {
  it('renders without crashing', () => {
    shallow(<Loading />);
  });
});