import React from 'react';
import { shallow } from 'enzyme';
import { Games } from './games';

describe('<Games />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Games currentUser={{}} filters={{}} dispatch={callback} />);
    expect(wrapper.find('.games__wrapper')).toHaveLength(1);
  });
});
