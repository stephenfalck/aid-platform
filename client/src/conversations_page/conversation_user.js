import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@material-ui/core';

class ConversationUser extends React.Component {
    state = {
        userName: ''
    };

    componentDidMount() {
        this.fetchUserNames(this.props.conversation.id)
    }

    fetchUserNames = (id) => {
        const url = `conversations/${id}/users`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            //console.log(data)
            this.setConversationUser(Cookies.getJSON('currentUser').user_id, data)
        })
        .catch(error => console.error('Error: ', error))
    }

    setConversationUser = (currentUserId, arr) => {
        let user = arr.find(i => i.id !== currentUserId)
        //console.log(currentUserId)

        this.setState({
            userName: `${user.first_name} ${user.last_name}`
        })
    }


    render() {
        return(
            <Fragment>
                <ListItem alignItems="flex-start" key={this.props.conversation.id}>
                    <ListItemAvatar>
                        <Avatar alt="Profile pic" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.state.userName}
                        secondary={
                            <React.Fragment>
                            {"Potential message snippet" }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="middle" />
            </Fragment>
        )
    }
}

export default ConversationUser;