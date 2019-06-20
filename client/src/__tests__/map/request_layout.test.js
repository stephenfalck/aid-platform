import React from 'react';
import { shallow, mount } from 'enzyme';
import { RequestsPage } from '../../map/requests_layout';
import RequestsMapContainer from '../../map/requests_map_container';
import Footer from '../../map/footer/footer';
import Navbar from '../../navbar/navbar';
import { jssPreset } from '@material-ui/core';

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
        const wrapper = shallow(<RequestsPage />);
        const state = {userLocation: {lat: 0, lng: 0}}
        wrapper.setState(state)

        const component = <RequestsMapContainer userLocation={state.userLocation}/>

        expect(wrapper.contains(component)).toEqual(true);
    });

    /*it('renders <Footer> component', () => {  
        const wrapper = shallow(<RequestsPage requests={[{fulfilled:true},{fulfilled:true},{fulfilled:false}]}/>)
        const props = {
            requests: [
                {fulfilled:true},{fulfilled:true},{fulfilled:false}
                ],
            fetchRequests: () => {
              "function"
            }
          }
        console.log(wrapper.debug())
        //const fetchRequests = () => jest.fn()
        const component = <Footer {...props}/>

        expect(wrapper.contains(component)).toEqual(true);
    });*/
})