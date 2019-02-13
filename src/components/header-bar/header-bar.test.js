import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { HeaderBar } from './header-bar';

describe('<HeaderBar />', function () {
  it('renders without crashing', () => {
    shallow(<HeaderBar />);
  });

  it('dispatches logout action', function () {
    const callback = jest.fn();
    const wrapper = shallow(<HeaderBar loggedIn={true} dispatch={callback} />);
    wrapper.find('.App-header__logout').simulate('click');
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
