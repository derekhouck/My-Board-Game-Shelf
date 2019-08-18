import React from 'react';
import { shallow } from 'enzyme';
import { AdminGames } from './admin-games';

describe('<AdminGames />', function () {
  it('renders without crashing', () => {
    const dispatch = jest.fn().mockResolvedValue();
    shallow(<AdminGames dispatch={dispatch} />);
  });
});