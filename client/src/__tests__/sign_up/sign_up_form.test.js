import React from 'react';
import SignUpForm from '../../sign_up/sign_up_form';
import { shallow, mount } from 'enzyme';

describe('<SignUpForm>', () => {
  it('renders without crashing', () => {
      const wrapper = shallow(<SignUpForm />);

      expect(wrapper.find('form')).toBeDefined();
    });

    it('Should capture first name correctly onChange', () => {
      const component = mount(<SignUpForm />);
      const input = component.find('input').at(0);
      input.instance().value = 'John';
      input.simulate('change');
      expect(component.state().first_name).toEqual('John');
      component.unmount();
    })
    
    it('Should submit the form data to the server', () => {
      const component = mount(<SignUpForm />);
      //console.log(component.debug())
      const state = {first_name:'John', last_name:'Doe'}
      //window.fetch = jest.fn();
    
      const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
        const mockFetchPromise = Promise.resolve({ 
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
    
      component.setState(state)
      component.find('form').simulate('submit')
      expect(global.fetch).toHaveBeenCalledTimes(1);
      global.fetch.mockClear();
      component.unmount()
    })
})