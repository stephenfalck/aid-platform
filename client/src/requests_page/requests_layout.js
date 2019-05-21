import React, { Fragment } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './requests_layout.css'
import { CallReceived } from '@material-ui/icons';

class RequestsPage extends React.Component {
    render() {
        return(
            <Fragment>
                <Navbar />
                <Grid container id="map-container">
                    <Grid item>
                        <Typography variant='h1'>
                            Hello
                        </Typography>
                    </Grid>
                </Grid>
                <Footer />
            </Fragment>
        )
    }
}

export default RequestsPage;