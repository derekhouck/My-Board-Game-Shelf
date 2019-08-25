import React from 'react';
import { shallow } from 'enzyme';
import { HeaderBar } from './header-bar';

describe('<HeaderBar />', function () {
  it('renders without crashing', () => {
    const wrapper = shallow(<HeaderBar />);
    expect(wrapper.find('.App-header')).toHaveLength(1);
  });

  it('dispatches logout action', function () {
    const callback = jest.fn();
    const wrapper = shallow(<HeaderBar loggedIn={true} dispatch={callback} />);
    wrapper.find('.App-header__logout').simulate('click');
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
