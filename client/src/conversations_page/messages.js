import React from 'react';

class Message extends React.Component {
    render() {
        return(
            <div>
                {this.props.message.text}
            </div>
        )
    }
}

export default Message;