import React from 'react';
//import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Fab  } from '@material-ui/core';
import './footer.css'
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

class Footer extends React.Component {
    render() {
        return(
            <AppBar position="fixed" color="primary" style={{top: 'auto', bottom: 0}}>
                <Toolbar style={{ alignItems: 'center', justifyContent: 'space-between'}}>
                <IconButton color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                </IconButton>
                <Fab color="secondary" aria-label="Add" id="fab-add-button">
                    <AddIcon />
                </Fab>
                <div>
                    <IconButton color="inherit">
                    <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit">
                    <MoreIcon />
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Footer;