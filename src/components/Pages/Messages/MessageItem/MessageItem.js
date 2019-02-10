import React from 'react';
import './MessageItem.scss';
import messagesShape from '../../../../Helpers/Data/props/messageShape';

class MessageItem extends React.Component {
  static propTypes = {
    message: messagesShape,
  }

  render() {
    const { message } = this.props;
      return (
          <div className="messageItem">
            <div className="message card">{message.message}</div>
          </div>
      );
    };
}

export default MessageItem;