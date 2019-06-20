import React from 'react';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import RequestCard from './request_card';
import NoRequests from './no_requests_component'


class RequestCards extends React.Component {
    
    state={
        userRequests: []
    }
    componentDidMount(){
        this.userCards(this.props.requests)
    }

    userCards = (requests) => {
        let userRequests = requests.filter(request => request.user_id === Cookies.getJSON('currentUser').user_id);

        this.setState({
            userRequests: userRequests
        })
    }

    render() {
        const cards = this.state.userRequests.map(request => 
            <RequestCard request={request} key={request.id} fetchRequests={this.props.fetchRequests}/>
            )
        const noRequests = <NoRequests />

        
        return(
            <Grid container id="my-requests-container" style={this.state.userRequests.length === 0 ? null : {padding: '10px', background: 'white'}}>
                { this.state.userRequests.length === 0 ? noRequests : cards }
            </Grid>
        )
    }
}

export default RequestCards;

