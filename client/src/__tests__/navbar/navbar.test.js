import React from 'react';
import { shallow, mount } from 'enzyme';
import NavBar from '../../navbar/navbar';

it('renders without crashing', () => {
    shallow(<NavBar />);
});


it('has a title element', () => {
    let wrapper = mount(<NavBar title="Request" />)
    let title = 'Request'
    expect(wrapper.find('h6').text()).toBe(title)

});

