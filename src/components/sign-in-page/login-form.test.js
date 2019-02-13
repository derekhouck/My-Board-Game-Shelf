import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './login-form';

describe('<LoginForm />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    shallow(<LoginForm handleSubmit={callback} />);
  });
});
