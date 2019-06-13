import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from '../../sign_up/sign_up_layout' ;
import SignUpForm from '../../sign_up/sign_up_form';

it('renders without crashing', () => {
    shallow(<SignUpPage />);
  });

  it('renders sign up form', () => {
    const wrapper = shallow(<SignUpPage />);
    const signUpForm = <SignUpForm/>;
    expect(wrapper.contains(signUpForm)).toEqual(true);
  });