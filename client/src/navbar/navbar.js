import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem  } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu'

class Navbar extends React.Component {
    state = {
        anchorEl: null
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" style={{marginLeft: -12, marginRight: 20}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Requests
                    </Typography>
                    <div>
                        <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>Log out</MenuItem>
                        </Menu>
                    </div>  
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;