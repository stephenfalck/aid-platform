import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { Grid, TextField } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import './conversations.css';

class ConversationsPage extends React.Component {
    constructor(props){
        super(props);

        this.state  = {
            conversations: []
        }
    }
    /*state = {
        conversations: null
    };*/

    componentDidMount() {
        this.fetchConversations()
    }

    
    fetchConversations = () => {
        const url = `/users/${Cookies.getJSON('currentUser').user_id}/conversations`

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            this.setState({
                conversations: data
            })
            console.log(this.state.conversations)
        })
    }
 

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render() {      
        let { conversations } = this.state;

        return(
            <Fragment>
                <Navbar title='Inbox' history={this.props.history}/>
                <Grid container id="conversations-container">
                    <Grid item sm={3} style={{height: '100%'}} id="contacts">
                        <h4>Conversations container</h4>
                        {conversations.map(conversation => (
                            <div key={conversation.id} className="conversation-users">{conversation.id}</div>
                        ))}  
                    </Grid>
                    <Grid item sm={9} style={{height: '100%'}}>
                        <Grid container direction={'column'} style={{height: '100%'}}>
                            <Grid item sm={10} style={{maxWidth: '100%'}}>
                                <h4>messages container</h4>
                            </Grid>
                            <Grid item sm={2} style={{maxWidth: '100%'}}>
                            <TextField
                                id="message"
                                label="Write a message..."
                                value={this.state.message}
                                margin="normal"
                                InputProps={{disableUnderline: true}}
                                fullWidth
                                multiline
                                rowsMax="4"
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