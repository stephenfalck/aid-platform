import React from 'react';
import { Link } from "react-router-dom";
import { Paper, Grid, Typography } from '@material-ui/core';
import LogInForm from './log_in_form';
import './landing_layout.css';
import Cookies from 'js-cookie';

class LandingPage extends React.Component {
    componentDidMount() {
        if(Cookies.get('Authorization')) {
            this.props.history.replace('/')
        }
    }

    render() {
        return(
            <Grid container alignContent={'center'} justify={'center'} className="main-container" style={{minHeight: '100vh'}}>
                <Grid item md={10}>
                    <Paper>
                        <Grid container>
                            <Grid item md={7} style={{padding: "15px"}}>                        
                                <Typography variant="h2">
                                    Aid Platform
                                </Typography>
                                <Typography variant="subtitle1">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                </Typography>                    
                            </Grid>
                            <Grid item md={5} style={{padding: "15px"}}>                        
                                <Typography variant="h4">
                                    Welcome Back
                                </Typography>
                                <Typography variant="overline">
                                    Log in to continue
                                </Typography>
                                <LogInForm history={this.props.history} location={this.props.location.state}/> 
                                <Typography variant="subtitle2">
                                    Not a member? <Link to='/signup'>Sign up.</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default LandingPage;
