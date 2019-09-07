import React from 'react';
import { shallow } from 'enzyme';
import StatusIndicator from './status-indicator';

describe('<StatusIndicator />', function () {
  it('renders without crashing', () => {
    const wrapper = shallow(<StatusIndicator />);
    expect(wrapper).toMatchSnapshot();
  });
});