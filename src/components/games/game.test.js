import React from 'react';
import { shallow } from 'enzyme';
import { Game } from './game';

describe('<Game />', function () {
  it('renders without crashing', () => {
    shallow(<Game game={{ tags: [], players: {} }} />);
  });
});
