import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const NotFound = () => {
    return(
        <Grid container alignItems={'center'} justify={'center'} style={{minHeight: '70vh'}}>
            <Grid item xs={12} justify='center'>
                <Typography variant='h3'>
                    404: Page not found
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound;