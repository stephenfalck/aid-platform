import React from 'react';
import Cookies from 'js-cookie';
import { Grid, Typography, Card, CardContent, CardActions, Button, CardHeader } from '@material-ui/core';

class RequestCard extends React.Component {
    componentDidMount(){
        //console.log(this.props.request.created_at)
    }

    handleFulfilled = () => {
        const url = `requests/${this.props.request.id}`;
        const data = {
            fulfilled: true
        };

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response)
            this.props.fetchRequests();
            //return response.json()
        })//.then(data => {
            //console.log(data)
        //})
        .catch(error => console.error('Error:', error)) 
    }

    handleRelist = () => {
        const url = `requests/${this.props.request.id}`;
        const data = {
            fulfilled: false
        };

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response)
            this.props.fetchRequests();
            //return response.json()
        })//.then(data => {
            //console.log(data)
        //})
        .catch(error => console.error('Error:', error))
    }


    render() {
        return(
            <Grid item sm={6} xs={12}>
                <Card raised>
                    <CardHeader 
                    title="Request"
                    subheader={this.props.request.created_at}
                    className="request-card-title" 
                    style={this.props.request.request_category_id === 1 ? {backgroundColor: "#8C9EFF"} : {backgroundColor: "#f6685e"}}
                    />   
                    <CardContent style={{paddingTop: '0'}}>
                        <Typography  variant={'overline'} color="textSecondary" gutterBottom>
                            {this.props.request.request_category_id === 1 ? "Request type: One-time task" : " Request Type: Material need"}
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle2'>
                        {this.props.request.description}
                        </Typography>
                        <br />
                        <Typography  color="textSecondary">
                        {this.props.request.id}
                        </Typography>
                        <br></br>
                        <Typography variant="body1">
                        Status: {this.props.request.fulfilled ? "Fulfilled" : "Unfulfilled"}
                        <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                        variant="contained" 
                        size="small" 
                        color="primary" 
                        onClick={this.handleRelist}
                        >
                        Repost
                        </Button>
                        <Button 
                        variant="contained" 
                        size="small" 
                        color="secondary" 
                        onClick={this.handleFulfilled}
                        >
                        Fulfilled
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default /*connect(
    null,
    { setRequests }
)*/(RequestCard);