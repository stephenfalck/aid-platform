import React from 'react';
import { TextField, FormControl, InputLabel, InputAdornment, IconButton, Input,
        Fab } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import NavigationIcon from '@material-ui/icons/Navigation';

class LogInForm extends React.Component {
    state = {
        email: '',
        password: '',
        showPassword: false
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleSubmit = () => {
        
    }

    render() {
        return(
            <form>
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