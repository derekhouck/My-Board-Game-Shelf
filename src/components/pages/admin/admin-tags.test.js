import React from 'react';
import { shallow } from 'enzyme';
import AdminTags from './admin-tags';

describe('<AdminTags />', function () {
  it('renders without crashing', () => {
    const wrapper = shallow(<AdminTags />);
    expect(wrapper).toMatchSnapshot();
  });
});