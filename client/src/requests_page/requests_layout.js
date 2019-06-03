import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Cookies from 'js-cookie';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './requests_layout.css'
import RequestsMapContainer from './requests_map_container'
import { store } from "../redux/store";
import { setRequests } from '../redux/actions';

class RequestsPage extends React.Component {
    componentDidMount() {
        this.fetchRequests();
    }

    dispatchRequests = (requests) => {
        store.dispatch(setRequests(requests))
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
            console.log(store.getState().requests)
        })
        .catch(error => console.error('Error:', error)) 
    }
    

    render() {
        return(
            <Fragment>
                <Navbar title='Requests' history={this.props.history} />
                <Grid container id="map-container">
                    <RequestsMapContainer />
                </Grid>
                <Footer />
            </Fragment>
        )
    }
}

export default RequestsPage;