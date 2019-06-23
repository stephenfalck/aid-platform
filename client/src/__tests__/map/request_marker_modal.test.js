import React from 'react';
import { shallow, mount } from 'enzyme';
import { create } from "react-test-renderer";
import RequestMarkerModal from '../../map/request_marker_modal';
import Cookies from 'js-cookie';

describe('<RequestMarkerModal>', () => {
    it('renders without crashing', () => {
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        const props = {
            request: {
                request_category_id: 1
            }
        }

        shallow(<RequestMarkerModal {...props}/>);
    })

    it('displays the title, request type, description and requesters name', () => {
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        const props = {
            request: {
                request_category_id: 1,
                description: 'description',
                fulfilled: false,
                id: 1,
                user_id: 1
            }
        }

        const wrapper = shallow(<RequestMarkerModal {...props}/>);
        console.log(wrapper.debug())
        
        const requestType = wrapper.find('WithStyles(Typography)').at(0)
        console.log(requestType.text())
        expect(requestType.text()).to.equal('Request type: One-time task')
    })
})