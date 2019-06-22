import React from 'react';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import RequestCard from './request_card';
import NoRequests from './no_requests_component'


class RequestCards extends React.Component {
    userCards = (requests) => {
        console.log('hello')
        let userRequests = requests.filter(request => request.user_id === Cookies.getJSON('currentUser').user_id);

        this.setState({
            userRequests: userRequests
        })
    }

    render() {
        console.log(this.props.requests)
        
        let userRequests = this.props.requests.filter(request => request.user_id === Cookies.getJSON('currentUser').user_id)
        console.log(userRequests)
        //const cards = this.state.userRequests.map(request => 
        //    <RequestCard request={request} key={request.id} fetchRequests={this.props.fetchRequests}/>
        //    )
            const cards = userRequests.map(request => 
                <RequestCard request={request} key={request.id} fetchRequests={this.props.fetchRequests}/>
                )
        const noRequests = <NoRequests />

        
        return(
            <Grid container id="my-requests-container" style={userRequests.length === 0 ? null : {padding: '10px', background: 'white'}}>
                { userRequests.length === 0 ? noRequests : cards }
            </Grid>
        )
    }
}

export default RequestCards;

