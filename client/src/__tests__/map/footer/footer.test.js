import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from '../../../map/footer/footer';

it('renders without crashing', () => {
    const requests = [{fulfilled:true},{fulfilled:false},{fulfilled:false}]

    const footer = shallow(<Footer requests={requests}/>);
    console.log(footer.debug())
  });

/*it('displays total requests as 2 when passed 2 unfulfilled requests', ()=> {
    const requests = [{fulfilled:true},{fulfilled:false},{fulfilled:false}]

    const footer = shallow(<Footer requests={requests}/>);
    const total = footer.find('WithStyles(Typography)').at(0)
    console.log(total.debug())
    expect(total.contains('2')).to.be.true
})


describe('add request button', () => {
    let add;

    beforeEach(() => wrapper = mount(<Footer />))
    beforeEach(() => add = wrapper.find('fab-add-button'))

    it('renders a form modal when clicked', () => {
        add.simulate('click')
    })

})
*/