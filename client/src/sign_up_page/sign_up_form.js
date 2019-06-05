import React from 'react';
import Cookies from 'js-cookie';
import { TextField, Button, Fab, FormControl, InputLabel, 
        InputAdornment, IconButton, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


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

    handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById("sign-up-form")

        const formData = new FormData(form)
        const url = '/signup'

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            this.setState({
                response: response
            })
            /*
            if (response.status !== 201) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            */
             Cookies.set('Authorization', response.headers.get('Authorization'), { expires: 1 });
             return response.json();
        }).then(data => {
            //console.log(data)
            Cookies.set('currentUser', {
                user_id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email         
            }, { expires: 1 })

            this.checkResponseStatus(this.state.response);
        })
        .catch(error => console.error('Error:', error));    
    }

    checkResponseStatus = (response) => {
        if (response.status === 201) {
            this.props.history.push("/requests")
        }
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
                <label htmlFor="upload">
                    <Button component="span" color="primary">
                    Upload ID
                    </Button>
                </label>
                <input
                    accept="image/png, image/jpeg, .pdf"
                    id="upload"
                    name="image"
                    type="file"
                    ref={this.fileInput}
                    required
                    style={{width: "100%"}}
                />
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