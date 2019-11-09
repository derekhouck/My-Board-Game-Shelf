import React from 'react';
import { shallow } from 'enzyme';
import { Users } from './users';

describe('<Users />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Users users={[]} dispatch={callback} />);
    expect(wrapper).toMatchSnapshot();
  });
});
