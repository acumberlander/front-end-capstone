import React, { useState } from 'react';
import './AddMessage.scss';

const defaultMessage = {
	uid: '',
	message: '',
	timestamp: 0,
};

const AddMessage = ({ onClick }) => {
	const [newMessage, setNewMessage] = useState(defaultMessage);

	const inputFieldStringState = (name, e) => {
		e.preventDefault();
		const tempMessage = { ...newMessage };
		tempMessage[name] = e.target.value;
		setNewMessage(tempMessage);
	};

	const messageChange = (e) => inputFieldStringState('message', e);

	const inputSubmit = (e) => {
		e.preventDefault();
		const myMessage = { ...newMessage };
		onClick(myMessage);
		setNewMessage(defaultMessage);
	};

	const handleEnterInput = (target) => {
		if (target.key === 'Enter') {
			const { onKeyUp } = this.props;
			const myMessage = { ...newMessage };
			onKeyUp(myMessage);
			setNewMessage(defaultMessage);
		}
	};

	return (
		<div className="input-group mt-3 mb-3">
			<textarea
				type="text"
				className="form-control"
				id="messageInput"
				placeholder="Enter Your Message"
				aria-describedby="message-help"
				value={newMessage.message}
				onChange={messageChange}
				onKeyUp={handleEnterInput}
				autoFocus
			/>
			<div className="input-group-prepend" onClick={inputSubmit}>
				<button className="btn btn-primary" type="button" id="basic-addon1">
					send
				</button>
			</div>
		</div>
	);
};

export default AddMessage;
