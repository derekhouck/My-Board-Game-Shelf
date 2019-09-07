import React from 'react';
import { shallow } from 'enzyme';
import { GameForm } from './game-form';

describe('<GameForm />', function () {
  const mockFetchTagAction = {
    type: 'FETCH_TAGS'
  };
  jest.mock('../actions/games', () => Object.assign({}, require.requireActual('../actions/games'), {
    fetchTags: jest.fn().mockImplementation(() => {
      return mockFetchTagAction;
    })
  }));

  it('renders without crashing', () => {
    const callback = jest.fn();
    const promise = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = shallow(<GameForm tags={[]} handleSubmit={callback} dispatch={promise} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call dispatch when mounted', function () {
    const handleSubmit = jest.fn();
    const dispatch = jest.fn(() => Promise.resolve());
    shallow(<GameForm tags={[]} handleSubmit={handleSubmit} dispatch={dispatch} />);
    expect(dispatch).toHaveBeenCalled();
  });
});
