import React from 'react';
import { shallow } from 'enzyme';
import { DeleteAccount } from './delete-account';

describe('<DeleteAccount />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    shallow(<DeleteAccount currentUser={{}} handleSubmit={callback} initialize={callback} />);
  });
});
