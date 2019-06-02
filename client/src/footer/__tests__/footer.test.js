import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './footer';

it('renders without crashing', () => {
    shallow(<Footer />);
  });

/*
describe('add request button', () => {
    let add;

    beforeEach(() => wrapper = mount(<Footer />))
    beforeEach(() => add = wrapper.find('fab-add-button'))

    it('renders a form modal when clicked', () => {
        add.simulate('click')
    })

})
*/