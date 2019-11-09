import React from 'react';
import { shallow } from 'enzyme';
import { TableFilters } from './table-filters';

describe('<TableFilters />', function () {
  it('renders without crashing', () => {
    const wrapper = shallow(<TableFilters />);
    expect(wrapper).toMatchSnapshot();
  });
});