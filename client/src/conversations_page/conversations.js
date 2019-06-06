import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { Grid, TextField, List } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import ConversationUser from './conversation_user';
import Message from './messages';
import './conversations.css';

class ConversationsPage extends React.Component {
    state = {
        conversations: [],
        messages: [],
    };

    componentDidMount() {
        this.fetchConversations()
    }

    displayMessages = (conversation_id) => {
        const url = `/conversations/${conversation_id}/messages`;

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
            console.log(data)
            this.setState({
                messages: data
            })
        })
        .catch(error => console.error('Error: ', error))


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
        .catch(error => console.error('Error: ', error))
    }
 
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render() {      
        let { conversations } = this.state;
        //let messages = store.getState().messages

        const messages = this.state.messages.map(message => 
            <Message 
              key={message.id} message={message} 
            />
        );
        
        return(
            <Fragment>
                <Navbar title='Inbox' history={this.props.history}/>
                <Grid container id="conversations-container">
                    <Grid item sm={3} style={{height: '100%'}} id="contacts">
                        <List>
                            {conversations.map(conversation => (
                                <ConversationUser key={conversation.id} conversation={conversation}  click={this.displayMessages}/>
                            ))}  
                        </List>
                    </Grid>
                    <Grid item sm={9} style={{height: '100%'}}>
                        <Grid container direction={'column'} style={{height: '100%'}}>
                            <Grid item sm={10} style={{maxWidth: '100%'}}>
                                <h4>messages container</h4>
                                {messages}
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