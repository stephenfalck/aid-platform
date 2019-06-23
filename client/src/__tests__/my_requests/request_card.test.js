import React from 'react';
import RequestCard from '../../my_requests/request_card';
import { shallow, mount } from 'enzyme';

const fetchRequests = jest.fn()

describe('<RequestCard />', () => {
    it('renders without crashing', () => {
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2
        }

        shallow(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
    })

    it('disables the fulfill button if request is classed as fulfilled', () => {
        /* fix */
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2,
            fulfilled: false,
            description: 'brief description'
        }

        const card = mount(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
        const button = card.filter('button').at(1)
        //console.log(button)
    })
})