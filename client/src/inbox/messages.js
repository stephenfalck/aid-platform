import React from 'react';
import Cookies from 'js-cookie';
import './messages.css'

const Message = (props) => {
    return(
        <div className={props.message.user_id === Cookies.getJSON('currentUser').user_id ? "message my-message" : "message their-message"}>
            {props.message.text}
        </div>
    )
}

export default Message;