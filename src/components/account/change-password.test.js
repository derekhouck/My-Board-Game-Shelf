import React from 'react';
import { shallow } from 'enzyme';
import { ChangePassword } from './change-password';

describe('<ChangePassword />', function () {
  it('renders without crashing', function () {
    const handleSubmit = jest.fn();
    shallow(<ChangePassword handleSubmit={handleSubmit} />);
  });
});