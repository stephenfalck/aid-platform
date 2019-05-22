import React from 'react';
import { TextField, Button, Fab, FormControl, InputLabel, 
        InputAdornment, IconButton, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { store } from "../redux/store";
import { setJwtToken, setAuthenticatedUser } from '../redux/actions';


class SignUpForm extends React.Component {
   state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    showPassword: false,
    password_confirmation: '',
    showPasswordConfirmation: false,
    response: {}
   }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowPasswordConfirmation = () => {
        this.setState(state => ({ showPasswordConfirmation: !state.showPasswordConfirmation }));
    };

    dispatchToken = (token) => {
        store.dispatch(setJwtToken(token));
    }

    dispatchUser = (user) => {
        store.dispatch(setAuthenticatedUser(user));
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById("sign-up-form")

        const formData = new FormData(form)
        const url = '/signup'

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            /*
            if (response.status !== 201) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            */
             //console.log(response.headers.get('Authorization'))
             this.dispatchToken(response.headers.get('Authorization'))
             return response.json();
        }).then(data => {
            //console.log(data)
            this.dispatchUser(data);
            console.log(store.getState());
        })
        .catch(error => console.error('Error:', error));  
        
    }
    render() {
        return(
            <form id="sign-up-form" onSubmit={this.handleSubmit}>
                <TextField
                    label="First Name"
                    name="first_name"
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    onChange={this.handleChange('last_name')}
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    onChange={this.handleChange('email')}
                    margin="normal"
                    required
                    fullWidth
                />
                <FormControl style={{width: '100%', marginBottom: '8px'}} required>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        name='password'
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl style={{width: '100%', marginBottom: '8px'}} required>
                    <InputLabel htmlFor="adornment-password-confirmation">Password Confirmation</InputLabel>
                    <Input
                        id="adornment-password-confirmation"
                        type={this.state.showPasswordConfirmation ? 'text' : 'password'}
                        value={this.state.password_confirmation}
                        onChange={this.handleChange('password_confirmation')}
                        name="password_confirmation"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPasswordConfirmation}
                            >
                            {this.state.showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <input
                    accept="image/png, image/jpeg, .pdf"
                    id="upload"
                    name="image"
                    type="file"
                    ref={this.fileInput}
                    required
                    style={{width: "100%"}}
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
                type="submit"
                style={{marginTop: "15px", marginBottom: "10px", width: "100%"}}
                >
                    Sign up
                </Fab>   
            </form>
        )
    }
}

export default SignUpForm;