import React from 'react';
import { shallow } from 'enzyme';
import { AdminGames } from './admin-games';

describe('<AdminGames />', function () {
  const dispatch = jest.fn().mockResolvedValue();

  it('renders a Games heading when admin', () => {
    const wrapper = shallow(
      <AdminGames dispatch={dispatch} />
    );
    expect(wrapper).toMatchSnapshot();
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
      />
    );
    wrapper.setState({ isLoading: false });
    games.forEach(game =>
      expect(wrapper.contains(game.title)).toBe(true)
    );
  });

  it('filters by status', () => {
    const games = [
      {
        id: 1,
        status: 'pending',
        title: 'Game One'
      },
      {
        id: 2,
        status: 'approved',
        title: 'Game Two'
      }
    ];
    const wrapper = shallow(
      <AdminGames
        dispatch={dispatch}
        games={games}
      />
    );

    wrapper.setState({ isLoading: false });
    wrapper.find('select').simulate('change', { target: { value: 'approved' } });
    expect(wrapper.contains(games[0].title)).toBe(false);
    expect(wrapper.contains(games[1].title)).toBe(true);
  });
});