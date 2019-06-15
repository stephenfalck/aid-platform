import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from '../../../map/footer/footer.js';

it('renders without crashing', () => {
    const requests = [{fulfilled:true},{fulfilled:true},{fulfilled:false}]

    shallow(<Footer requests={requests}/>);
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