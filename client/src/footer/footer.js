import React from 'react';
import RequestModal from './request_modal';
import { AppBar, Toolbar, IconButton, Fab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import './footer.css';

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
                    <RequestModal open={this.state.open} close={this.handleClose} />
                </Toolbar>
            </AppBar>
        )
    }
}

export default Footer;