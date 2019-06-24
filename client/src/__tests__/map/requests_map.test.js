import React from 'react';
import { shallow, mount } from 'enzyme';
import RequestsMapContainer from '../../map/requests_map_container';
import RequestsMap from '../../map/requests_map';
import RequestMarker from '../../map/request_marker';
import RequestMarkerModal from '../../map/request_marker_modal';

describe('<RequestsMapContainer>', () => {
    it('renders without crashing', () => {
        shallow(<RequestsMapContainer />);
    })
})

describe('<RequestsMap>', () => {
    it('renders without crashing', () => {
        const apiKey='key'
        shallow(<RequestsMap loadingElement={<div style={{ height: `100%` }} />} googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}/>)
    })

})

describe('<RequestMarker>', () => {
    it('renders without crashing', () => {
        const props = {
            handleClickOpen: () => {
              "function"
            },
            position: {
                lat: 0,
                lng: 0
            },
            request: {
                request_category_id: 1
            }
        }
        
        shallow(<RequestMarker {...props} />)
    })

    /*
    it('renders <RequestMarkerModal>', () => {
        const props = {
            handleClickOpen: () => {
              "function"
            },
            position: {
                lat: 0,
                lng: 0
            },
            request: {
                request_category_id: 1
            }
        }
        
        const wrapper = shallow(<RequestMarker {...props} />)
        const modal = <RequestMarkerModal open={false} close={jest.fn()} request={props.request} />

        console.log(wrapper.debug())
        console.log(modal)
        //expect(wrapper.find(modal)).toHaveLength(1)
        //expect(wrapper).toContain(modal)
        expect(wrapper.containsMatchingElement(modal)).toEqual(true)
    })
    */
    
})