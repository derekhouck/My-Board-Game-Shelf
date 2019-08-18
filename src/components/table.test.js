import React from 'react';
import { shallow } from 'enzyme';
import Table from './table';

describe('<Table />', function () {
  it('renders without crashing', () => {
    shallow(<Table />);
  });
});