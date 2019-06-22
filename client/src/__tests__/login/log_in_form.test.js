import React from 'react';
import LogInForm from '../../login/log_in_form';
import { shallow, mount } from 'enzyme';
import renderer, { create } from 'react-test-renderer';
import Cookies from 'js-cookie';
import { TextField } from '@material-ui/core';

describe('<LogInForm>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LogInForm />);

    expect(wrapper.find('form')).toBeDefined();
  });

  
  it('renders a correct snapshot', () => {
    let form = create(<LogInForm />)
    expect(form.toJSON()).toMatchSnapshot();
  })


  it('Should capture email correctly onChange', () => {
    const component = mount(<LogInForm />);
    const input = component.find('input').at(0);
    input.instance().value = 'hello@email.com';
    input.simulate('change');
    expect(component.state().email).toEqual('hello@email.com');
    component.unmount();
  })


  it('Should submit the form data to the server', () => {
    Cookies.set = jest.fn()
    .mockImplementation(() => 'jwt');

    const state = {email:'hello@email.com', password:'hello'}
    const component = mount(<LogInForm />);
    component.setState(state)

    const mockSuccessResponse = {};
      const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
      const mockFetchPromise = Promise.resolve({ 
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    component.find('form').simulate('submit')
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  
  })
})
