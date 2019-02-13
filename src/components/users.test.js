import React from 'react';
import { shallow } from 'enzyme';
import { Users } from './users';

describe('<Users />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    shallow(<Users users={[]} dispatch={callback} />);
  });
});
