import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const NotFound = () => {
    return (
        <Grid container justify='center' alignContent='center' style={{height: '400px'}}>
            <Grid item sm={10} xs={10}>
                <Typography variant="h2" align="center">
                    404: Not found
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound