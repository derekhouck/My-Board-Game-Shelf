import React from 'react';
import { shallow } from 'enzyme';
import { GameForm } from './game-form';

describe('<GameForm />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    const promise = jest.fn().mockImplementation(() => Promise.resolve());
    shallow(<GameForm tags={[]} handleSubmit={callback} dispatch={promise} />);
  });
});
