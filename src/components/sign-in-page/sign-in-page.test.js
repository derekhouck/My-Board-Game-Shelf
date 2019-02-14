import React from 'react';
import { shallow } from 'enzyme';
import { SignInPage } from './sign-in-page';

describe('<SignInPage />', function () {
  it('renders without crashing', () => {
    shallow(<SignInPage />);
  });

  it('renders the sign-in-body when not loading', function () {
    const wrapper = shallow(<SignInPage />);
    expect(wrapper.exists('.sign-in-body')).toEqual(true);
  });

  it('renders a message when loading', function () {
    const wrapper = shallow(<SignInPage loading={true} />);
    expect(wrapper.exists('.message-default')).toEqual(true);
  })
});
