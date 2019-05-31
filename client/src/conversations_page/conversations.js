import React, { Fragment } from 'react';
import { Grid, TextField } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import './conversations.css'

class ConversationsPage extends React.Component {
    state = {
        
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render() {
        return(
            <Fragment>
                <Navbar history={this.props.history}/>
                <Grid container id="conversations-container">
                    <Grid item sm={3} style={{height: '100%'}} id="contacts">
                        <h4>Conversations container</h4>
                    </Grid>
                    <Grid item sm={9} style={{height: '100%'}}>
                        <Grid container direction={'column'} style={{height: '100%'}}>
                            <Grid item sm={10} style={{maxWidth: '100%'}}>
                                <h4>messages container</h4>
                            </Grid>
                            <Grid item sm={2} style={{maxWidth: '100%'}}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Write a message..."
                                    multiline
                                    rowsMax="4"
                                    value={this.state.multiline}
                                    onChange={this.handleChange('message')}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default ConversationsPage;