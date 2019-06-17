import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import SignUpPage from '../../sign_up/sign_up_layout' ;
import SignUpForm from '../../sign_up/sign_up_form';


describe('<SignUpPage>', () => {
  it('renders without crashing', () => {
      shallow(<SignUpPage />);
    });

    it('renders a correct snapshot', () => {
      let wrapper = create(<SignUpPage />)
      expect(wrapper.toJSON()).toMatchSnapshot();
    })

    it('renders sign up form', () => {
      const history = '/history'
      const wrapper = shallow(<SignUpPage history={history}/>);
      const signUpForm = <SignUpForm history="/history"/>;

      //console.log(wrapper.debug())
      expect(wrapper.contains(signUpForm)).toEqual(true);
    });
})