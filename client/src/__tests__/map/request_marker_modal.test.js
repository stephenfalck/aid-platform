import React from 'react';
import { shallow, mount } from 'enzyme';
import RequestMarkerModal from '../../map/request_marker_modal';
import Cookies from 'js-cookie';
import { Typography } from '@material-ui/core';

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

    it('displays the request type, description', () => {
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
        const type = "One-time task"
        //const desc = 'description'

        const wrapper = shallow(<RequestMarkerModal {...props}/>);
        //console.log(wrapper.debug())
        const requestType = wrapper.find('WithStyles(Typography)').at(0)
        const description = wrapper.find('WithStyles(Typography)').at(1)
        //console.log(requestType.debug())
        expect(requestType.debug()).toContain(type)
        expect(description.debug()).toContain(props.request.description)
    })

    it('displays the requeser name and replies number', () => {
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        const props = {
            request: {
                request_category_id: 1,
                description: 'description',
                fulfilled: false,
                id: 1,
                user_id: 1
            },
            open: true
        }

        const fetchRepliesNumber =  jest.fn()
        .mockImplementation(() => 3);


        const wrapper = mount(<RequestMarkerModal {...props}/>);
        //wrapper.setState({repliesNumber: 3})

        const replies = wrapper.find('h6').at(1).text()

        expect(replies).toEqual('Replies so far: 3')
    })

})