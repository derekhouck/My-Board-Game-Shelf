import React from 'react';
import { shallow } from 'enzyme';
import { EditAccount } from './edit-account';

describe('<EditAccount />', function () {
  it('renders without crashing', function () {
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    shallow(<EditAccount
      currentUser={{}}
      initialize={initialize}
      handleSubmit={handleSubmit}
    />);
  });

  it('calls onSubmit when the submit button is clicked', function () {
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    const wrapper = shallow(<EditAccount
      currentUser={{}}
      initialize={initialize}
      handleSubmit={handleSubmit}
    />);
    wrapper.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});