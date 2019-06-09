import React from 'react';
import Cookies from 'js-cookie';
import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Radio, RadioGroup, 
    FormControl, FormControlLabel, FormLabel  } from '@material-ui/core';

class RequestModal extends React.Component {
    state = {
        category: '1',
        location: {},
        response: {}
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
            this.setState({
              response: response
            })
              console.log(response)
              if(response.status === 201) {
                this.handleClose()
              }  
              return response.json()
          }).then(data => {
              console.log(data)
              if (this.state.response.status === 422) {
                this.validateForm(data.message)
              }
          })
          .catch(error => console.error('Error: ', error))

          this.setState({
            category: '1',
          })
      }    

      handleSubmit = (e) => {
          e.preventDefault();

          this.getLocationData()
          this.props.fetchRequests()
      }

      validateForm = (message) => {
        if(this.state.description){
          this.setState({
            descriptionIssue: false
          })
        }
        const addressIssue = "Validation failed: Latitude can't be blank, Longitude can't be blank";
        const descriptionIssue = "Validation failed: Description can't be blank";

        if (message === addressIssue) {
          this.setState({
            addressIssue: true
          })
        } else if (message === descriptionIssue) {
          this.setState({
            descriptionIssue: true
          })
        } else {
          this.setState({
            addressIssue: true,
            descriptionIssue: true
          })
        }
        
      }

      renderAddressIssue = () => {
        if(this.state.addressIssue) {
          return (
            <div className='request-error-message' style={{fontWeight:'bold', color: '#f44336'}}> 
                Incorrent address format
            </div>
          )
        }
      }

      renderDescriptionIssue = () => {
        if(this.state.descriptionIssue) {
          return (
          <div className='request-error-message' style={{fontWeight:'bold', color: '#f44336'}}> 
              Can't be blank
          </div>
          )
        }
      }

      handleClose = () => {
        this.setState({
          addressIssue: false,
          descriptionIssue: false
        })
        this.props.close()
      }

    render() {
        return(
            <Dialog
              open={this.props.open}
              onClose={this.handleClose}
              scroll="paper"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Make a request</DialogTitle>
              <DialogContent>
                <DialogContentText>
                    Please fill out this form to add your request to the map...
                </DialogContentText>
                <form id='request-form' onSubmit={this.handleSubmit} noValidate>
                    <TextField
                    autoFocus
                    margin="normal"
                    id="address"
                    label="Address"
                    fullWidth
                    required
                    onChange={this.handleChange('address')}
                    error={this.state.addressIssue}
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
                    error={this.state.addressIssue}
                    />
                    <TextField
                    margin="normal"
                    id="post-code"
                    label="Post Code"
                    required
                    onChange={this.handleChange('postCode')}
                    error={this.state.addressIssue}
                    />
                    {this.renderAddressIssue()}
                <TextField
                        id="standard-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="6"
                        onChange={this.handleChange('description')}
                        margin="normal"
                        fullWidth
                        required
                        error={this.state.descriptionIssue}
                    />
                    {this.renderDescriptionIssue()}
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
                <Button color="primary" type="submit" form="request-form">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
        )
    }
}

export default RequestModal;