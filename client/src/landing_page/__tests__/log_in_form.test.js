import React from 'react';
import LogInForm from '../log_in_form';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<LogInForm />);
  });