import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { Grid, List, Button, Paper, InputBase } from '@material-ui/core';
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
                message: null
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
                <Grid container item id="conversations-container" xs={12}>
                    <Grid item style={{height: '100%'}} id="contacts" xs={3}>
                        <List>
                            {conversations.map(conversation => (
                                <ConversationUser key={conversation.id} conversation={conversation}  click={this.displayMessages} active={this.state.currentConversation}/>
                            ))}  
                        </List>
                    </Grid>
                    <Grid container item xs={9} style={{height: '100%'}} direction='row' wrap='wrap'>
                        
                            <Grid container className='messages-container' item xs={12} direction='column' style={{maxWidth: '100%', height:'80%', padding: '10px', backgroundColor: 'white'}}>
                                {messages}
                            </Grid>
                            <Grid container item xs={12} direciton='row' alignItems='flex-end' style={{maxWidth: '100%', height: '20%'}}>
                                
                                    <Grid item xs={12}>
                                <form id='message-form' onSubmit={this.handleSubmit}>
                                    <Paper id="input-paper" elevation={1} style={{borderRadius: '0px'}}>
                                        <InputBase 
                                            id="message-input" 
                                            placeholder="Write a message..." 
                                            fullWidth 
                                            multiline 
                                            rows='4' 
                                            style={{padding: '6px'}} 
                                            onChange={this.handleChange('message')}
                                        />
                                        <Button variant="contained" color="secondary" type='submit' form='message-form' style={{borderRadius: '0px'}}>
                                            <Icon>send</Icon>
                                        </Button>
                                    </Paper>
                                    </form>
                                    </Grid>
                                    
                                    {/*
                                    <Grid item xs={2} >
                                        
                                    <Button variant="contained" color="primary" type='submit' form='message-form'>
                                        <Icon>send</Icon>
                                    </Button>
                                        
                                </Grid>
                                */}
                            </Grid>
                        
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default ConversationsPage;