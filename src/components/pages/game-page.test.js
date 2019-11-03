import React from 'react';
import { shallow } from 'enzyme';
import { GamePage } from './game-page';

describe('<GamePage />', function () {
  const match = { params: { id: 1 } };
  it('renders without crashing', () => {
    const wrapper = shallow(<GamePage match={match} />);
    expect(wrapper).toMatchSnapshot();
  })
});