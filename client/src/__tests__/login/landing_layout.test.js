import React from 'react';
import LandingPage from '../../login/landing_layout';
import LogInForm from '../../login/log_in_form';
import { shallow, mount } from 'enzyme';
import { Typography } from '@material-ui/core';

  describe('<LandingPage />', () => {
    it('renders without crashing', () => {
      const location = {state: '/location'}
      shallow(<LandingPage location={location} />);
    });

    /*
    it('renders three <Foo /> components', () => {
      const wrapper = shallow(<MyComponent />);
      expect(wrapper.find(Foo)).to.have.lengthOf(3);
    });
    */
  })