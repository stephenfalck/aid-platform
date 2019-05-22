import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './requests_layout.css'
import RequestsMapContainer from './requests_map_container'

class RequestsPage extends React.Component {
    render() {
        return(
            <Fragment>
                <Navbar />
                <Grid container id="map-container">
                    <RequestsMapContainer />
                </Grid>
                <Footer />
            </Fragment>
        )
    }
}

export default RequestsPage;