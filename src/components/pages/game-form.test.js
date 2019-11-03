import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { GameForm } from './game-form';

describe('<GameForm />', function () {
  const dispatch = jest.fn(() => Promise.resolve());
  const handleSubmit = jest.fn();

  it('renders without crashing', () => {
    const wrapper = shallow(<GameForm handleSubmit={handleSubmit} dispatch={dispatch} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call dispatch when mounted', function () {
    shallow(<GameForm handleSubmit={handleSubmit} dispatch={dispatch} />);
    expect(dispatch).toHaveBeenCalled();
  });

  it('redirects when editing and not admin', function () {
    const wrapper = shallow(
      <GameForm
        dispatch={dispatch}
        editing
        handleSubmit={handleSubmit}
      />
    );
    expect(wrapper.contains(<Redirect to="/" />)).toBe(true);
  });

  it('displays errors', function () {
    const wrapper = shallow(
      <GameForm
        dispatch={dispatch}
        error={{ message: 'Test error message' }}
        handleSubmit={handleSubmit}
      />
    );
    expect(wrapper.contains('Test error message')).toBe(true);
  });
});
