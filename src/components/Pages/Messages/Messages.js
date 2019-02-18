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

  // componentDidUpdate() {
  //   this.resetStateOfMessages();
  // }

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

// import React from 'react';
// import moment from 'moment';
// import messagesData from '../../../Helpers/Data/Requests/messagesData';
// import '../Messages/Messages.scss';

// class messages extends React.Component {
//   state = {
//     messagesArray: '',
//   }

//   componentWillMount() {
//     messagesData.sortMessages(this.props.tradeId)
//       .then((messagesArray) => {
//         this.setState({ messagesArray });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   messagesBuilder = () => {
//     const messagesRender = [];
//     const whichUser = (user) => {
//       if (user === this.props.user) {
//         return 'sentMsg';
//       }
//       return 'receivedMsg';
//     };
//     if (this.state.messagesArray !== '') {
//       this.state.messagesArray.forEach((message) => {
//         messagesRender.push(<div className={whichUser(message.user)} key={message.id}>
//           <div className='msgInfo'>
//             <p className='msgPar msgUser'>{message.user}</p>
//             <p className='msgPar msgDate'>{message.date}</p>
//           </div>
//           <p className='msgPar msgMsg'>{message.message}</p>
//         </div>);
//       });
//     }
//     return messagesRender;
//   }

//   addMessage = (event) => {
//     event.preventDefault();
//     const newMessage = document.getElementById('messagesInput').value;
//     const newMessageObj = {
//       tradeId: this.props.tradeId,
//       user: this.props.user,
//       message: newMessage,
//       date: moment().format('MM/DD/YYYY, hA'),
//     };
//     messagesData.postMessage(newMessageObj)
//       .then(() => {
//         document.getElementById('messagesInput').value = '';
//         this.refreshMessages();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   refreshMessages = () => {
//     messagesData.sortMessages(this.props.tradeId)
//       .then((messagesArray) => {
//         this.setState({ messagesArray });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render() {
//     return (
//       <div className='messages'>
//         <div className='messagesDiv'>
//           {this.messagesBuilder()}
//         </div>
//         <div className='messageNew'>
//           <input type='text' id='messagesInput' onSubmit={this.addMessage}/>
//           <button type='button' onClick={this.addMessage}>Send</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default messages;