import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Cookies from 'js-cookie';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './requests_layout.css'
import RequestsMapContainer from './requests_map_container'
import { store } from "../redux/store";
import { connect } from 'react-redux';
import { setRequests } from '../redux/actions';

class RequestsPage extends React.Component {
    componentDidMount() {
        this.fetchRequests();
        //console.log(Cookies.get('Authorization'))
    }

    dispatchRequests = (requests) => {
        this.props.setRequests(requests)
    }

    fetchRequests() {
        const url = '/requests';
         
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            this.dispatchRequests(data)
            //this.setState({
            //    requests: data
            //})
        })
        .catch(error => console.error('Error:', error)) 
    }
    

    render() {
        return(
            <Fragment>
                <Navbar title='Requests' history={this.props.history} />
                <Grid container id="map-container">
                    <RequestsMapContainer  />
                </Grid>
                <Footer fetchRequests={this.fetchRequests} />
            </Fragment>
        )
    }
}

export default connect(
    null, 
    { setRequests }
)(RequestsPage);