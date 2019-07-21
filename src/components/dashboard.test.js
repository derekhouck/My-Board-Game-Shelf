import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';

describe('<Dashboard />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    shallow(<Dashboard currentUser={{}} dispatch={callback} />);
  });
});
