import React from 'react';
import Cookies from 'js-cookie';
import './messages.css'

class Message extends React.Component {
    render() {
        return(
            <div className={this.props.message.user_id === Cookies.getJSON('currentUser').user_id ? "message my-message" : "message their-message"}>
                {this.props.message.text}
            </div>
        )
    }
}

export default Message;