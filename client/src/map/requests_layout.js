import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Cookies from 'js-cookie';
import Navbar from '../navbar/navbar';
import Footer from './footer/footer';
import './requests_layout.css'
import RequestsMapContainer from './requests_map_container'
import { connect } from 'react-redux';
import { setRequests } from '../redux/actions';

class RequestsPage extends React.Component {
    componentDidMount() {
        this.fetchRequests();
        //console.log(Cookies.get('Authorization'))
    }

    //dispatchRequests = (requests) => {
    //    this.props.setRequests(requests)
    //}

    fetchRequests = () => {
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
            //this.dispatchRequests(data)
            this.props.setRequests(data)
        })
        .catch(error => console.error('Error:', error)) 
        console.log("requests fetched")
    }
    

    render() {
        return(
            <Fragment>
                <Navbar title='Requests' history={this.props.history} />
                <Grid container id="map-container">
                    <RequestsMapContainer  requests={this.props.requests}/>
                </Grid>
                <Footer fetchRequests={this.fetchRequests} requests={this.props.requests} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      requests: state.requests
    }
  }

export default connect(
    mapStateToProps, 
    { setRequests }
)(RequestsPage);