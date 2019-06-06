import React from 'react';
import Cookies from 'js-cookie';
import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Radio, RadioGroup, 
    FormControl, FormControlLabel, FormLabel  } from '@material-ui/core';

class RequestModal extends React.Component {
    state = {
        category: '1',
        location: {}
    };

      handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
      };

      
      
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
            this.saveRequest(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)

            /*
            console.log(data)
            console.log(data.results)
            console.log(data.results[0])
            console.log(data.results[0].geometry)
            console.log(data.results[0].geometry.location)
            console.log(data.results[0].geometry.location.lat)
            console.log(data.results[0].geometry.location.lng)
            
            this.setState({
                location: {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                }
            })
            console.log(this.state)
            */
        })
        .catch(error => console.error('Error: ', error))
      }

      saveRequest = (lat, lng) => {
        const url = '/requests';
          const data = {
              latitude: lat,
              longitude: lng,
              fulfilled: false,
              description: this.state.description,
              user_id: Cookies.getJSON('currentUser').user_id,
              request_category_id: parseInt(this.state.category)
          }

          console.log(data)

          
          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
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
            category: '1',
          })
      }
      
      
      

      handleSubmit = (e) => {
          e.preventDefault();

          this.getLocationData()
          
          /*
          this.getLocationData();


          const url = '/requests';
          const data = {
              latitude: this.state.location.lat,
              longitude: this.state.location.lng,
              fulfilled: false,
              description: this.state.description,
              user_id: Cookies.getJSON('currentUser').user_id,
              request_category_id: parseInt(this.state.category)
          }

          console.log(data)

          
          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
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
            category: '1',
          })
          */
          
      }

    render() {
        return(
            <Dialog
                      open={this.props.open}
                      onClose={this.props.close}
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
                        <Button onClick={this.props.close} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.props.close} color="primary" type="submit" form="request-form">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
        )
    }
}

export default RequestModal;