import React from 'react';
import { shallow } from 'enzyme';
import { SignInPage } from './sign-in-page';

describe('<SignInPage />', function () {
  it('renders without crashing', () => {
    shallow(<SignInPage />);
  });
});
