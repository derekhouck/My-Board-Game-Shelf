import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './login-form';

describe('<LoginForm />', function () {
  const handleSubmit = jest.fn();
  const error = { message: 'Test message' };

  it('renders without crashing', () => {
    shallow(<LoginForm handleSubmit={handleSubmit} />);
  });

  it('shows an error when error exists', function () {
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} error={error} />);
    expect(wrapper.exists('.form-error')).toBe(true);
  })

  it('shows a message when loading', function () {
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} loading={true} />);
    expect(wrapper.exists('.message-default')).toBe(true);
  });
});
