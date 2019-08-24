import React from 'react';
import { shallow } from 'enzyme';
import { Game } from './game';
import Button from '../button';

describe('<Game />', function () {
  it('renders without crashing', () => {
    shallow(<Game game={{ tags: [], players: {} }} />);
  });

  it('renders the game title', () => {
    const wrapper = shallow(
      <Game
        game={{ tags: [], players: {}, title: 'Example Title' }}
      />
    );
    expect(wrapper.find('.game__title').text()).toEqual('Example Title');
  });

  it('does not render buttons by default', () => {
    const wrapper = shallow(<Game game={{ tags: [], players: {} }} />);
    expect(wrapper.contains(<Button />)).toBe(false);
  });
});
