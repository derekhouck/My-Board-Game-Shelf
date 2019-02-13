import React from 'react';
import { shallow } from 'enzyme';
import { RegistrationPage } from './registration-page';

describe('<RegistrationPage />', function () {
  it('renders without crashing', () => {
    shallow(<RegistrationPage />);
  });
});
