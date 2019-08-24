import React from 'react';
import { shallow } from 'enzyme';
import { AdminGames } from './admin-games';

describe('<AdminGames />', function () {
  const dispatch = jest.fn().mockResolvedValue();

  it('renders without crashing', () => {
    shallow(<AdminGames dispatch={dispatch} />);
  });

  it('renders a Games heading when admin', () => {
    const wrapper = shallow(
      <AdminGames dispatch={dispatch} isAdmin />
    );
    expect(wrapper.find('h2').text()).toEqual('Games');
  })

  it('renders each game title', () => {
    const games = [
      { id: 1, title: 'Game One' },
      { id: 2, title: 'Game Two' }
    ];
    const wrapper = shallow(
      <AdminGames
        dispatch={dispatch}
        games={games}
        isAdmin
      />
    );
    wrapper.setState({ isLoading: false });
    games.forEach(game =>
      expect(wrapper.contains(<td>{game.title}</td>)).toBe(true)
    );
  });
});