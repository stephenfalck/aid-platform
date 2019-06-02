import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem  } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { store } from "../redux/store";
import { logOutUser } from '../redux/actions';

class Navbar extends React.Component {
    state = {
        anchorEl: null
    };

    componentDidMount(){
        console.log(store.getState());
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    dispatchLogOut = () => {
        store.dispatch(logOutUser());
    }

    handleLogOut = () => {
        this.handleClose();
        let url = "/logout";

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.getState().token
            }
        }).then(response => {
            console.log(response);
            //return response.json();
            this.checkResponseStatus(response);
        })
        .catch(error => console.error('Error:', error))
    }

    checkResponseStatus = (response) => {
        if (response.status === 204) {
            this.dispatchLogOut();
            //console.log(store.getState().token);
            this.props.history.push("/")
        }
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {this.props.title}
                    </Typography>
                    <div>
                        <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        id="menu-button"
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
                            <MenuItem onClick={this.handleClose}><Link to='/requests'>Requests</Link></MenuItem>
                            <MenuItem onClick={this.handleClose}><Link to='/inbox'>Inbox</Link></MenuItem>
                            <MenuItem onClick={this.handleLogOut}>Log out</MenuItem>
                        </Menu>
                    </div>  
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;