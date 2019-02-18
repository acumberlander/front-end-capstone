import React from 'react';
import './MessageItem.scss';
import messagesShape from '../../../../Helpers/Data/props/messageShape';
import authRequests from '../../../../Helpers/Data/authRequests';


class MessageItem extends React.Component {
  static propTypes = {
    message: messagesShape,
  }

  currentUid = authRequests.getCurrentUid();

  render() {
    const { message } = this.props;
    let messageStyling = 'message card m-3'
    if (message.uid === this.currentUid) {
      messageStyling = 'message card m-3 currentUser';
    } else {
      messageStyling = 'message2 card m-3 diffUser';
    }

    let messageLocation = 'messageBlock'
    if (message.uid === this.currentUid) {
      messageLocation = 'messageBlock';
    } else {
      messageLocation = 'messageBlock2';
    }
      return (
        <div>
          <div className={messageLocation}>
            <div className="test">
              <div className={messageStyling}>
                <div>{message.message}</div>
              </div>
            </div>
          </div>
          <hr/>
        </div>
      );
    };
}

export default MessageItem;