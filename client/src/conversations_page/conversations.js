import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { Grid, List, Button, Paper, InputBase, Typography, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Icon from '@material-ui/core/Icon';
import Navbar from '../navbar/navbar';
import ConversationUser from './conversation_user';
import Message from './messages';
import './conversations.css';

class ConversationsPage extends React.Component {
    state = {
        conversations: [],
        messages: [],
        headerContent: 'Open a conversation...',
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
        })
        .catch(error => console.error('Error: ', error))

        this.setState({
            message: null
        })
    }

    setConversationUser = (userName) => {
        this.setState({
            headerContent: userName
        })
        
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
                    <Grid item style={{height: '100%', padding: '10px'}} id="contacts" xs={3}>
                        <List>
                            {conversations.map(conversation => (
                                <ConversationUser 
                                    key={conversation.id} 
                                    conversation={conversation} 
                                    setConversationUser={this.setConversationUser} 
                                    click={this.displayMessages} 
                                    active={this.state.currentConversation}
                                />
                            ))}  
                        </List>
                    </Grid>
                    <Grid container item xs={9} id="message-and-input-area" style={{height: '100%'}} direction='row' wrap='wrap'>
                            <Grid container item xs={12} justify='center' style={{height:'10%'}} id='messages-area-header'>
                                <Paper elevation={2} id='messages-container-header' style={{width: '100%', textAlign: 'center'}}>
                                        {
                                            this.state.headerContent !== 'Open a conversation...' ? 
                                            <Avatar style={{marginRight:'10px'}}> 
                                                <ImageIcon /> 
                                            </Avatar> : null
                                        }
                                    <Typography variant='h5'>
                                        {this.state.headerContent}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid container id='messages-container' item xs={12} direction='column' style={{maxWidth: '100%', height:'75%'}}>
                                {messages}
                            </Grid>
                            <Grid container item xs={12} direciton='row' alignItems='flex-end' style={{maxWidth: '100%', height: '15%'}}>
                                
                                <Grid item xs={12} id='input-container'>
                                    <form id='message-form' onSubmit={this.handleSubmit}>
                                        <Paper id="input-paper" elevation={2}>
                                            <InputBase 
                                                id="message-input" 
                                                placeholder="Write a message..." 
                                                fullWidth 
                                                multiline 
                                                rows='4'
                                                rowsMax='4' 
                                                style={{padding: '6px', backgroundColor:'white', color: 'black', borderRadius:'4px'}} 
                                                onChange={this.handleChange('message')}
                                            />
                                            <Button variant="contained" id="message-submit-button" color="secondary" type='submit' form='message-form'>
                                                <Icon>send</Icon>
                                            </Button>
                                        </Paper>
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