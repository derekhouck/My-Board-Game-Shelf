import React from 'react';
import { shallow } from 'enzyme';
import { GamesSearchForm } from './games-search-form';

describe('<GamesSearchForm />', function () {
  it('renders without crashing', () => {
    const callback = jest.fn();
    shallow(<GamesSearchForm  tags={[]} handleSubmit={callback} />);
  });
});
