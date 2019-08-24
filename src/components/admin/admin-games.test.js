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
});