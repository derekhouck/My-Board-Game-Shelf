import React from 'react';
import { shallow } from 'enzyme';
import { Game } from './game';
import Button from '../atoms/button';

describe('<Game />', function () {
  it('renders without crashing', () => {
    shallow(<Game game={{ tags: [], players: {} }} />);
  });

  it('renders the game correctly', () => {
    const wrapper = shallow(
      <Game
        game={{
          tags: [],
          players: { min: 1, max: 5 },
          title: 'Example Title'
        }}
      />
    );
    expect(wrapper.contains('Example Title')).toBe(true);
    expect(wrapper.find(".game__players").text())
      .toEqual('Players: 1 - 5');
  });

  it('does not render buttons by default', () => {
    const wrapper = shallow(<Game game={{ tags: [], players: {} }} />);
    expect(wrapper.contains(<Button />)).toBe(false);
  });
});
