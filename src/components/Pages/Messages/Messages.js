import React from 'react';
import './Messages.scss';
import smashMessageRequests from '../../../helpers/data/smashRequests';
import SingleMessage from '../SingleMessages/SingleMessage';
import AddEditMessage from '../AddEditMessage/AddEditMessage';
import messageRequests from '../../../helpers/data/messageRequests';

class Messages extends React.Component {
  state = {
    messages: [],
    isEditing: false,
    editId: '-1',
  }

  getMessagesWithUserName = () => {
    smashMessageRequests.getAllMessagesWithUserInfo()
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
    const { isEditing, editId } = this.state;
    if (isEditing) {
      messageRequests.updateMessage(editId, newMessage)
        .then(() => {
          smashMessageRequests.getAllMessagesWithUserInfo()
            .then((messages) => {
              this.setState({ messages, isEditing: false, editId: '-1' });
            });
        }).catch(err => console.error(err));
    } else {
      messageRequests.createMessage(newMessage)
        .then(() => {
          this.getMessagesWithUserName();
        }).catch(err => console.error(err));
    }
  }

  deleteOne = (messageId) => {
    messageRequests.deleteMessage(messageId)
      .then(() => {
        this.getMessagesWithUserName();
      }).catch(err => console.error(err));
  }

  passMessageToEdit = messageId => this.setState({ isEditing: true, editId: messageId });

  render() {
    const singleMessageComponent = this.state.messages.map(message => (
      <SingleMessage
      message={message}
      key={message.id}
      deleteSingleMessage = {this.deleteOne}
      passMessageToEdit = {this.passMessageToEdit}
      />
    ));
    return (
      <div className= "messagesContainer">
        <h2 className="heading text-center">Messages</h2>
        <div className="Messages">
          {singleMessageComponent}
        </div>
        <AddEditMessage
        onClick={this.inputSubmitEvent}
        onKeyUp={this.inputSubmitEvent}
        isEditing={this.state.isEditing}
        editId={this.state.editId}
        />
      </div>
    );
  }
}

export default Messages;