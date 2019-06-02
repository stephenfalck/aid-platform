import React from 'react';
import { Marker } from "react-google-maps";
import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Typography  } from '@material-ui/core';

class RequestMarker extends React.Component {
    state = {
        open: false,
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
        console.log(this.state.currentRequest)
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
      };

    submitResponse = () => {

    }

    startConversation = () => {

    }

    render() {
        return(
            <Marker
                position={this.props.location}
                onClick={this.handleClickOpen}
            >
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Request details</DialogTitle>
                    <DialogContent>
                        <Typography variant='subtitle1'>
                            {this.props.request.description}
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle2'>
                            If you would like to fulfill this request, please send the user a message below and check fulfill.
                        </Typography>
                        <br></br>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="message"
                        label="Message"
                        fullWidth
                        multiline
                        rows="4"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                        Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </Marker>
        )
    }
}

export default RequestMarker;