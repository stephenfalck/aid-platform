import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';

const NoRequests = (props) => {
    return (
        <Grid item container alignContent={'center'} justify={'center'} xs={12}>
            <Grid item sm={8} xs={10}>
                <Paper elevation={3} id="no-requests-paper">
                    <Typography variant='h5'>
                        No requests. Please go to the map page to add a new request.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NoRequests;