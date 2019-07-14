import React from 'react';
import { shallow } from 'enzyme';
import { Games } from './games';

describe('<Games />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    shallow(<Games currentUser={{}} filters={{}} dispatch={callback} />);
  });
});
