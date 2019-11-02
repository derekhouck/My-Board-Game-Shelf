import React from 'react';
import { shallow } from 'enzyme';
import { GamesPage } from './games-page';

describe('<GamesPage />', function () {
  it('renders without crashing', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<GamesPage dispatch={dispatch} />);
    expect(wrapper.find('h1').text()).toEqual('Games');
  });
});