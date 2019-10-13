import React from 'react';
import { shallow } from 'enzyme';
import { AdminTagForm } from './admin-tag-form';

describe('<AdminTagForm />', function () {
  const dispatch = jest.fn(() => Promise.resolve());
  const handleSubmit = jest.fn();
  const match = { params: {} };

  it('renders without crashing', () => {
    const wrapper = shallow(
      <AdminTagForm
        dispatch={dispatch}
        handleSubmit={handleSubmit}
        match={match}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});