import React from 'react';
import './Messages.scss';
import MessageItem from './MessageItem/MessageItem';
import AddMessage from '../AddMessage/AddMessage';
import messageRequests from '../../../Helpers/Data/Requests/messageRequests';
import authRequests from '../../../Helpers/Data/authRequests';

class Messages extends React.Component {
  state = {
    messages: [],
  }

  resetStateOfMessages = () => {
    messageRequests.getAllMessages()
      .then((messages) => {
        if (messages.length > this.state.messages.length) {
          this.setState({ messages });
        }
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.resetStateOfMessages();
  }

  inputSubmitEvent = (newMessage) => {
    newMessage.uid = authRequests.getCurrentUid();
      messageRequests.createMessage(newMessage)
        .then(() => {
          this.resetStateOfMessages();
        }).catch(err => console.error(err));
  }

  render() {
    const messageItemComponent = this.state.messages.map(message => (
      <MessageItem
      message={message}
      key={message.id}
      />
    ));
    return (
      <div className= "messagesWrapper">
        <div className="messagesHeader">
          <h2 className="heading text-center">Messages</h2>
        </div>
        <div className="card messageCard">
          <div className="messageWindow">
            <div className="messagesContainer">
              {messageItemComponent}
            </div>
          </div>
        <AddMessage
        onClick={this.inputSubmitEvent}
        onKeyUp={this.inputSubmitEvent}
        />
        </div>
      </div>
    );
  }
}

export default Messages;
