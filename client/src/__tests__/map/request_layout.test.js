import React from 'react';
import { shallow, mount } from 'enzyme';
import { RequestsPage } from '../../map/requests_layout';
import RequestsMapContainer from '../../map/requests_map_container';
import Footer from '../../map/footer/footer';
import Navbar from '../../navbar/navbar';

describe('<RequestsPage>', () => {
    it('renders without crashing', () => {
        shallow(<RequestsPage />);
    })

    it('renders <Navbar> component', () => {  
        const wrapper = shallow(<RequestsPage />);
        const navbar = <Navbar title="Requests"/>

        expect(wrapper.contains(navbar)).toEqual(true);
    });

    it('renders <RequestsMapContainer> component', () => {  
        const requests = [
            {id: 1},
            {id: 2},
            {id: 3}
        ]
        const wrapper = shallow(<RequestsPage requests={requests}/>);
        const state = {userLocation: {lat: 0, lng: 0}}
        wrapper.setState(state)
        

        const fetchRequests = jest.fn()

        //console.log(wrapper.debug())

        const component = <RequestsMapContainer requests={requests} userLocation={state.userLocation} fetchRequests={fetchRequests}/>
        //console.log(component)

        expect(wrapper.find('RequestsMapContainer')).toHaveLength(1)
    });

    it('renders <Footer> component', () => {  
        const wrapper = shallow(<RequestsPage />)
        const props = {
            fetchRequests: () => {
              "function"
            },
            requests: [
                {fulfilled:true},{fulfilled:true},{fulfilled:false}
                ]
        }

        //console.log(wrapper.debug())
        const fetchRequests = jest.fn()
        fetchRequests
        .mockReturnValue({requests: [{id:1},{id:2},{id:3}]});
        const component = <Footer {...props} />
        //console.log(component)

        //expect(wrapper.contains(component)).toEqual(true);
        expect(wrapper.find('Footer')).toHaveLength(1)
    });
})