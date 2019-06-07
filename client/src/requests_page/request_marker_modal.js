import React from 'react';
import Cookies from 'js-cookie';
import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, Typography, Switch, FormControlLabel  } from '@material-ui/core';
//import { withStyles } from '@material-ui/core/styles';

class RequestMarkerModal extends React.Component {
    state = {
        checked: true,
        requestUserName: null,
        repliesNumber: null
      };

    componentDidMount() {
        this.fetchRequestUser(this.props.request.user_id)
        this.fetchRepliesNumber(this.props.request.id)
        console.log(this.props.classes)
    }

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

    fetchRequestUser = (user_id) => {
        const url = `/users/${user_id}`

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            this.setState({
                requestUserName: `${data.first_name} ${data.last_name}`
            })
        })
    }

    fetchRepliesNumber = (request_id) => {
        const url = `/requests/${request_id}/replies`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            this.setState({
                repliesNumber: data.length
            })
        })
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
        const data = {
            user_id: Cookies.getJSON('currentUser').user_id,
            user_id_2: this.props.request.user_id
        }

        fetch(url, {
            method: 'POST',
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
            this.submitMessage(data.id)
        })
        .catch(error => console.error('Error:', error))
    }

    submitMessage = (conversationId) => {
        const url = `/conversations/${conversationId}/messages`;
        const data = {
            user_id: Cookies.getJSON('currentUser').user_id,
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
            //console.log(response)
            return response.json()
        }).then(data => {
            //console.log(data)
        })
    }

    render() {
        return(
            <Dialog
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="form-dialog-title"
                    
                >
                    <DialogTitle 
                    id="form-dialog-title"
                    style={this.props.request.request_category_id === 1 ? {backgroundColor: "#8C9EFF", color:'#FFFFFF'} : {backgroundColor: "#f6685e"}}
                    >
                        {this.state.requestUserName} 
                    </DialogTitle>
                    <DialogContent>
                        
                        <Typography variant="overline" gutterBottom>
                            Request type: {this.props.request.request_category_id === 1 ? "One-time task" : 'Material need'}
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle1'>
                            {this.props.request.description}
                        </Typography>
                        
                        <br></br>
                        <Typography variant='subtitle2'>
                            Replies so far: {this.state.repliesNumber}
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
                                required
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
                        <Button onClick={this.props.close} color="primary">
                        Cancel
                        </Button>
                        <Button 
                        onClick={this.props.close} 
                        color="primary" 
                        type='submit' 
                        form="response-form"
                        disabled={Cookies.getJSON('currentUser').user_id === this.props.request.user_id ? true : false}
                        >
                        Submit
                        </Button>
                    </DialogActions>
                </Dialog>
        )
    }
}

export default RequestMarkerModal;