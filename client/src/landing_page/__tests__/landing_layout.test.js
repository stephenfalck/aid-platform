import React from 'react';
import LandingPage from '../landing_layout';
import LogInForm from '../log_in_form';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<LandingPage />);
  });

  it('renders log in form', () => {
    const wrapper = shallow(<LandingPage />);
    const logInForm = <LogInForm />;
    expect(wrapper.contains(logInForm)).toEqual(true);
  });