import React from 'react';
import PropTypes from 'prop-types';
import './AddMessage.scss';

const defaultMessage = {
  uid: '',
  message: '',
  timestamp: 0,
};

class AddMessage extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  state = {
    newMessage: defaultMessage,
  }

inputFieldStringState = (name, e) => {
  e.preventDefault();
  const tempMessage = { ...this.state.newMessage };
  tempMessage[name] = e.target.value;
  this.setState({ newMessage: tempMessage });
}

messageChange = e => this.inputFieldStringState('message', e);

inputSubmit = (e) => {
  e.preventDefault();
  const { onClick } = this.props;
  const myMessage = { ...this.state.newMessage };
  onClick(myMessage);
  this.setState({ newMessage: defaultMessage });
}

handleEnterInput = (target) => {
  if (target.key === 'Enter') {
    const { onKeyUp } = this.props;
    const myMessage = { ...this.state.newMessage };
    onKeyUp(myMessage);
    this.setState({ newMessage: defaultMessage });
  }
}

render() {
  const { newMessage } = this.state;
  return (
    <div className="input-group mt-3 mb-3">
      <textarea
      type="text"
      className="form-control"
      id="messageInput"
      placeholder="Enter Your Message"
      aria-describedby="message-help"
      value={newMessage.message}
      onChange={this.messageChange}
      onKeyUp={this.handleEnterInput}
      autoFocus
      />
      <div className="input-group-prepend" onClick={this.inputSubmit}>
        <button className="btn btn-primary" type="button" id="basic-addon1">send</button>
      </div>
    </div>
  );
}
}

export default AddMessage;