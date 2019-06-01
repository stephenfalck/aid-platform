import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import SignUpForm from './sign_up_form';

class SignUpPage extends React.Component {

    render() {
        return(
            <Grid container alignContent={'center'} justify={'center'} className="main-container" style={{minHeight: '100vh'}}>  
                <Grid item md={8}>
                    <Paper style={{padding: "15px"}}>
                        <SignUpForm history={this.props.history}/>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default SignUpPage;