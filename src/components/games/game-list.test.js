import React from 'react';
import { shallow } from 'enzyme';
import GameList from './game-list';

describe('<GameList />', function () {
  it('renders without crashing', () => {
    shallow(<GameList />);
  });
});