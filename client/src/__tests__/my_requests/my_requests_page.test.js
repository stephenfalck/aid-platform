import React from 'react';
import { MyRequestsPage } from '../../my_requests/my_requests_page';
import RequestCards from '../../my_requests/my_requests_page';
import Navbar from '../../navbar/navbar';
import { shallow, mount } from 'enzyme';
import Cookies from 'js-cookie';

describe('<MyRequestsPage />', () => {
    it('renders without crashing', () => {

        shallow(<MyRequestsPage />)
    })

    //it('renders <RequestCards> component', () => {  
    //    const wrapper = shallow(<MyRequestsPage requests={[{id: 1}, {id: 2}]}/>)
    //    const requestCards =  <RequestCards fetchRequests={jest.fn()} requests={[{id: 1}, {id: 2}]} />
    //    console.log(wrapper.debug())
    //    expect(wrapper.contains(requestCards)).toEqual(true);
    //  });

      it('renders <Navbar> component', () => {  
        const wrapper = shallow(<MyRequestsPage />);
        const navbar = <Navbar title="My Requests"/>
        //console.log(wrapper.debug())
        expect(wrapper.contains(navbar)).toEqual(true);
      });

})