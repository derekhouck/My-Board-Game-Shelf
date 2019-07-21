import React from 'react';
import { shallow } from 'enzyme';
import GamesPage from './games-page';

describe('<GamesPage />', function () {
  it('renders without crashing', () => {
    shallow(<GamesPage />);
  });
});