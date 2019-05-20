import React from 'react';
import { TextField, Button, Fab, Input, Typography } from '@material-ui/core';

class SignUpForm extends React.Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        Id: '',
        response: {}
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = (e) => {
        
    }
    

    render() {
        return(
            <form id="sign-up-form">
                <TextField
                    label="First Name"
                    value={this.state.name}
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    value={this.state.name}
                    onChange={this.handleChange('last_name')}
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    value={this.state.name}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    required
                    fullWidth
                />
                <input
                    accept="image/png, image/jpeg, .pdf"
                    id="upload"
                    type="file"
                    required
                />
                <label htmlFor="upload">
                    <Button component="span">
                    Upload
                    </Button>
                </label>
                   
                        <Fab 
                        variant="extended" 
                        aria-label="Sign up" 
                        color="secondary" 
                        onClick={this.handleSubmit}
                        style={{marginTop: "15px", marginBottom: "10px", width: "100%"}}
                        >
                            Sign up
                        </Fab>
                    
            </form>
        )
    }
}

export default SignUpForm;