import React from 'react';
import RequestModal from './request_modal';
import { AppBar, Toolbar, IconButton, Fab, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import './footer.css';
import { connect } from 'react-redux';

class Footer extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
        

    render() {
        return(
            <AppBar position="fixed" color="primary" style={{top: 'auto', bottom: 0}}>
                <Toolbar style={{ alignItems: 'center', justifyContent: 'space-between'}}>
                    <IconButton color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Fab color="secondary" aria-label="Add" id="fab-add-button" onClick={this.handleClickOpen}>
                        <AddIcon/>
                    </Fab>
                    <RequestModal open={this.state.open} close={this.handleClose} fetchRequests={this.props.fetchRequests} />
                    <Typography variant="overline" color="inherit">
                        Total requests: {this.props.requests.length}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

export default connect(mapStateToProps)(Footer);