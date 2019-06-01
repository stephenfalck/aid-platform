import React from 'react';
import SignUpForm from '../sign_up_form';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<SignUpForm />);
  });