import React from 'react';
import { shallow } from 'enzyme';
import { AdminGames } from './admin-games';
import { Redirect } from 'react-router-dom';

describe('<AdminGames />', function () {
  const dispatch = jest.fn().mockResolvedValue();

  it('renders a Games heading when admin', () => {
    const wrapper = shallow(
      <AdminGames dispatch={dispatch} isAdmin />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h2').text()).toEqual('Games');
  })

  it('redirects when not admin', () => {
    const wrapper = shallow(
      <AdminGames dispatch={dispatch} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(<Redirect to="/" />)).toBe(true);
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
        isAdmin
      />
    );

    wrapper.setState({ isLoading: false });
    wrapper.find('select').simulate('change', { target: { value: 'approved' } });
    expect(wrapper.contains(<td>{games[0].title}</td>)).toBe(false);
    expect(wrapper.contains(<td>{games[1].title}</td>)).toBe(true);
  });
});