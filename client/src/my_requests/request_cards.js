import React from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import RequestCard from './request_card';

const RequestCards = (props) => {

    let userRequests = props.requests.filter(request => request.user_id === Cookies.getJSON('currentUser').user_id);


    const cards = userRequests.map(request => 
    <RequestCard request={request} key={request.id} fetchRequests={props.fetchRequests}/>
)


    return (
        <Grid container spacing={16} id="my-requests-container">
            {cards}
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

export default connect(mapStateToProps)(RequestCards);

