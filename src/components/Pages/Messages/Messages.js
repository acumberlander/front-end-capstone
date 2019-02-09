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

  getMessagesWithUserName = () => {
    messageRequests.getAllMessagesWithUserInfo()
      .then((messages) => {
        if (messages.length > 10) {
          messages.splice(0, messages.length - 10);
        }
        this.setState({ messages });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getMessagesWithUserName();
  }

  inputSubmitEvent = (newMessage) => {
    newMessage.uid = authRequests.getCurrentUid();
      messageRequests.createMessage(newMessage)
        .then(() => {
          this.getMessagesWithUserName();
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
        <h2 className="heading text-center">Messages</h2>
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