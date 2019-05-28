import React from 'react';
import { TextField, FormControl, InputLabel, InputAdornment, IconButton, Input,
        Fab } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import NavigationIcon from '@material-ui/icons/Navigation';
import { store } from "../redux/store";
import { setJwtToken, setAuthenticatedUser } from '../redux/actions';

class LogInForm extends React.Component {
    state = {
        email: '',
        password: '',
        showPassword: false,
        response: {}
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    dispatchToken = (token) => {
        store.dispatch(setJwtToken(token));
    }

    dispatchUser = (user) => {
        store.dispatch(setAuthenticatedUser(user));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let url = '/login'
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //console.log(response.headers.get('Authorization'))
            this.setState({
                response: response
            })

            this.dispatchToken(response.headers.get('Authorization'))
            //console.log(store.getState())
            return response.json();
        }).then(data => {
            this.dispatchUser(data);
            console.log(store.getState())
            this.checkResponseStatus(this.state.response);
        })
        .catch(error => console.error('Error:', error)) 
    }

    checkResponseStatus = (response) => {
        if (response.status === 200) {
            this.props.history.push("/requests")
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="email"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    required
                    style={{width: '100%'}}
                />
                <FormControl style={{width: '100%'}} required>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        
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
                <Fab 
                variant="extended" 
                aria-label="Log in" 
                type="submit"
                color="secondary" 
                onClick={this.handleSubmit}
                style={{marginTop: "15px", marginBottom: "10px", width: "100%"}}
                >
                    <NavigationIcon />
                    Log in
                </Fab>
            </form>
        )
    }
}

export default LogInForm;