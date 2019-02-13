import React from 'react';
import { shallow } from 'enzyme';
import Select from './select';

describe('<Select />', function () {
  it('renders without crashing', () => {
    shallow(<Select input={{}} />);
  });
});
