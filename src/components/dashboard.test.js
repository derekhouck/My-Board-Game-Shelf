import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';

describe('<Dashboard />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    const wrapper = shallow(
      <Dashboard currentUser={{}} dispatch={callback} />
    );
    expect(wrapper.contains(<h1>Your Shelf</h1>)).toBe(true);
  });
});
