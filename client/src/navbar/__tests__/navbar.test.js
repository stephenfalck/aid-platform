import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../navbar';

it('renders without crashing', () => {
    shallow(<NavBar />);
});


/*
it('has a title of the current page', () => {
    let wrapper = shallow(<NavBar />)
    let title = ''
    expect(wrapper.find().text()).toBe(title)

});


describe('menu', () => {
    let menu;
    beforeEach(() => wrapper = mount(<NavBar />))
    beforeEach(() => search = wrapper.find('#root > header.MuiPaper-root-10.MuiPaper-elevation4-16.MuiAppBar-root-1.MuiAppBar-positionStatic-5.MuiAppBar-colorPrimary-8 > div > div > button'))

    it('starts out hidden')
    it('becomes visible after being clicked on')
})
*/