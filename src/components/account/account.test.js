import React from 'react';
import { shallow } from 'enzyme';
import { Account } from './account';

describe('<Account />', function () {
  it('renders without crashing', () => {
    shallow(<Account currentUser={{}} />);
  });

  it('calls the toggleDeleting action when the "Delete Account" button is clicked', function () {
    const dispatch = jest.fn();
    const mockToggleDeletingAction = { type: 'TOGGLE_DELETING' };
    const wrapper = shallow(<Account currentUser={{}} dispatch={dispatch} />);
    wrapper.find('.delete-account-button').simulate('click');
    expect(dispatch).toHaveBeenCalledWith(mockToggleDeletingAction);
  });
});
