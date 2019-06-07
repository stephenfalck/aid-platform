import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { Grid, TextField, List, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Navbar from '../navbar/navbar';
import ConversationUser from './conversation_user';
import Message from './messages';
import './conversations.css';

class ConversationsPage extends React.Component {
    state = {
        conversations: [],
        messages: []
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
            //console.log(data)
            this.setState({
                messages: data,
                currentConversation: conversation_id
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
        })
        .catch(error => console.error('Error: ', error))
    }
 
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const url = `/conversations/${this.state.currentConversation}/messages`
        let data = {
            text: this.state.message,
            user_id: Cookies.getJSON('currentUser').user_id
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            console.log(data)
            this.displayMessages(data.conversation_id)
            this.setState({
                message: ''
            })
        })
        .catch(error => console.error('Error: ', error))

    }

    render() {      
        let { conversations } = this.state;

        const messages = this.state.messages.map(message => 
            <Message 
              key={message.id} message={message} 
            />
        );
        
        return(
            <Fragment>
                <Navbar title='Inbox' history={this.props.history}/>
                <Grid container id="conversations-container">
                    <Grid item xs={3} style={{height: '100%'}} id="contacts">
                        <List>
                            {conversations.map(conversation => (
                                <ConversationUser key={conversation.id} conversation={conversation}  click={this.displayMessages}/>
                            ))}  
                        </List>
                    </Grid>
                    <Grid item xs={9} style={{height: '100%'}}>
                        <Grid container direction={'row'} style={{height: '100%'}}>
                            <Grid item xs={12} style={{maxWidth: '100%', height:'60vh'}}>
                                <h4>messages container</h4>
                                {messages}
                            </Grid>
                            <Grid item xs={12} style={{maxWidth: '100%', height: '20vh'}}>
                                <form id='message-form' onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="message"
                                        label="Write a message..."
                                        multiline
                                        rows="4"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange('message')}
                                    />
                                    <Button variant="contained" color="primary" type='submit' form='message-form'>
                                        <Icon>send</Icon>
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default ConversationsPage;