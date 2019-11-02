import React from 'react';
import { shallow } from 'enzyme';
import GamePage from './game-page';

describe('<GamePage />', function () {
  it('renders without crashing', () => {
    const wrapper = shallow(<GamePage />);
    expect(wrapper).toMatchSnapshot();
  })
});