import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Grid, Typography, Card, CardContent, CardActions, Button, CardHeader } from '@material-ui/core';

class RequestCard extends React.Component {
    componentDidMount(){
        console.log(this.props.request.created_at)
    }


    render() {
        return(
            <Grid item xs={6}>
                <Card raised>
                    <CardHeader title="Request">
                       
                    </CardHeader>
                    <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                        {this.props.request.id}
                        </Typography>
                        
                        <Typography  color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant='subtitle2'>
                        {this.props.request.description}
                        </Typography>
                        <br />
                        <Typography variant="button">
                        Status: {this.props.request.fulfilled ? "Fulfilled" : "Unfulfilled"}
                        <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                        Relist
                        </Button>
                        <Button size="small" color="secondary">
                        Fulfilled
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default RequestCard;