import React from 'react';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import RequestCard from './request_card';
import NoRequests from './no_requests_component'

const RequestCards = (props) => {

    let userRequests = props.requests.filter(request => request.user_id === Cookies.getJSON('currentUser').user_id);


    const cards = userRequests.map(request => 
    <RequestCard request={request} key={request.id} fetchRequests={props.fetchRequests}/>
)

    const noRequests = <NoRequests />


    return (
        <Grid container className="main-container" id="my-requests-container">
            {userRequests >= 1 ? cards : noRequests}
        </Grid>
    )
}


export default RequestCards;

