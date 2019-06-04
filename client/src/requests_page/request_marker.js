import React from 'react';
import { Marker } from "react-google-maps";
import Cookies from 'js-cookie';
import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, Typography, Switch, FormControlLabel  } from '@material-ui/core';

class RequestMarker extends React.Component {
    state = {
        open: false,
        checked: true,
        currentRequest: {}
      };

    handleClickOpen = () => {
        this.setState({ 
            open: true,
            currentRequest: {
                request_id: this.props.request.id,
                request_user_id: this.props.request.user_id,
                description: this.props.request.description,
                request_category: this.props.request.request_category_id
            }
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
      };

    handleCheckChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    handleSubmit = (e) => {
        e.preventDefault()
        this.submitReply();
        this.startConversation();
    }

    submitReply = () => {
        const url = "/replies"
        const data = {
            request_id: this.props.request.id,
            volunteer_id: Cookies.getJSON('currentUser').user_id,
            active: this.state.checked,
            message_sent: true
        }


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            //console.log(data)
        })
        .catch(error => console.error('Error:', error))
    }

    startConversation = () => {
        const url = '/conversations';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            console.log(data)
            this.submitMessage(data.id)
        })
        .catch(error => console.error('Error:', error))
    }

    submitMessage = (conversationId) => {
        const url = `/conversations/${conversationId}/messages`;
        const data = {
            user_id: Cookies.get('currentUser').user_id,
            conversation_id: conversationId,
            text: this.state.message
        }

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            console.log(data)
        })
    }

    render() {
        return(
            <Marker
                position={this.props.location}
                onClick={this.handleClickOpen}
                icon={this.props.request.request_category_id === 1 ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            >
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Request type: {this.props.request.request_category_id === 1 ? "One-time task" : "Material need"}</DialogTitle>
                    <DialogContent>
                        <Typography variant='subtitle1'>
                            {this.props.request.description}
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle2'>
                            If you would like to fulfill this request, please send the user a message below and check fulfill.
                        </Typography>
                        <br></br>
                        <form id="response-form" onSubmit={this.handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="message"
                                label="Message"
                                fullWidth
                                multiline
                                rows="4"
                                onChange={this.handleChange('message')}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                    checked={this.state.checked}
                                    onChange={this.handleCheckChange('checked')}
                                    value="checked"
                                    color="primary"
                                    />
                                }
                                label="Fulfill"
                                />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary" type='submit' form="response-form">
                        Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </Marker>
        )
    }
}

export default RequestMarker;