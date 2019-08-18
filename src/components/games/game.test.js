import React from 'react';
import { shallow } from 'enzyme';
import { Game } from './game';
import Button from '../button';

describe('<Game />', function () {
  it('renders without crashing', () => {
    shallow(<Game game={{ tags: [], players: {} }} />);
  });

  it('does not render buttons by default', () => {
    const wrapper = shallow(<Game game={{ tags: [], players: {} }} />);
    expect(wrapper.contains(<Button />)).toBe(false);
  });
});
