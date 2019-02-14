import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

describe('<Input />', function () {
  it('renders without crashing', () => {
    shallow(<Input meta={{}} input={{}} />);
  });

  it('shows an error message when error exists', function () {
    const wrapper = shallow(<Input meta={{
      touched: true,
      error: 'Test error'
    }} input={{}} />);
    expect(wrapper.exists('.form-error')).toBe(true);
  });

  it('shows a warning message when warning exists', function () {
    const wrapper = shallow(<Input meta={{
      touched: true,
      warning: 'Test warning'
    }} input={{}} />);
    expect(wrapper.exists('.form-warning')).toBe(true);
  });
});
