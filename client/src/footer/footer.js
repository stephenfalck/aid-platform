import React from 'react';
import { AppBar, Toolbar, IconButton, Fab, Button,
    TextField, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Radio, RadioGroup, 
    FormControl, FormControlLabel, FormLabel  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import './footer.css';
import { store } from "../redux/store";

class Footer extends React.Component {
    state = {
        open: false,
        category: '1',
        location: {}
    };

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      
      handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
      };

      
      /*
      getLocationData = () => {
        const apiKey = 'AIzaSyCrNPz4UTHYuMbYlXUxM7UT21hf9742Dfk';
        const address = `${this.state.address}+${this.state.town}+${this.state.postCode}`;
        const joinedAddress = address.replace(/ /g, '+');
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${joinedAddress}&key=${apiKey}`;

        fetch(url, {
            method: "GET",
            mode: 'cors'
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            console.log(data)
            this.setState({
                location: {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                }
            })
        })
        .catch(error => console.error('Error: ', error))
      }
      */

      handleSubmit = (e) => {
          e.preventDefault();
          //console.log(this.state)
          
          //this.getLocationData();


          //const url = '/requests';
          const data = {
              latitude: this.state.location.lat,
              longitude: this.state.location.lng,
              fulfilled: false,
              description: this.state.description,
              user_id: store.getState().current_user.id,
              request_category_id: parseInt(this.state.category)
          }

          console.log(data)

          /*
          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.getState().token
            },
            body: JSON.stringify(data)
          }).then(response => {
              console.log(response)
              return response.json()
          }).then(data => {
              console.log(data)
          })
          .catch(error => console.error('Error: ', error))

          this.setState({
            open: false,
            category: '1',
          })
          */
          
      }
        

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
                <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      scroll="paper"
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Make a request</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                            Please fill out this form to add your request to the map...
                        </DialogContentText>
                        <form id='request-form' onSubmit={this.handleSubmit}>
                            <TextField
                            autoFocus
                            margin="normal"
                            id="address"
                            label="Address"
                            fullWidth
                            required
                            onChange={this.handleChange('address')}
                            />
                            <TextField
                            margin="normal"
                            id="address-2"
                            label="Address 2"
                            fullWidth
                            onChange={this.handleChange('address-2')}
                            />
                            <TextField
                            margin="normal"
                            id="town-city"
                            label="Town/City"
                            required
                            onChange={this.handleChange('town')}
                            />
                            <TextField
                            margin="normal"
                            id="post-code"
                            label="Post Code"
                            required
                            onChange={this.handleChange('postCode')}
                            />
                        <TextField
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax="6"
                                onChange={this.handleChange('description')}
                                margin="normal"
                                fullWidth
                                required
                            />
                            <FormControl component="fieldset" style={{marginTop: '30px'}}>
                                <FormLabel component="legend">Category</FormLabel>
                                <RadioGroup
                                    aria-label="Category"
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.handleChange('category')}
                                >
                                    <FormControlLabel value='1' control={<Radio />} label="One-time task" />
                                    <FormControlLabel value='2' control={<Radio />} label="Material Need" />
                                </RadioGroup>
                            </FormControl>
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary" type="submit" form="request-form">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Footer;