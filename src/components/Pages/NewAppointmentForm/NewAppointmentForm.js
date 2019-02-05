import React from 'react';
import './NewAppointmentForm.scss';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import messageRequests from '../../../Helpers/Data/Requests/messageRequests';

const defaultAppointment = {
  firstName: '',
  lastName: '',
  date: '',
  status: 'is pending',
  address: '',
  city: '',
  state: '',
  acres: '',
  uid: '',
  price: '0',
};

const defaultComment = {
  uid: '',
  message: '',
  timestamp: 0,
};

class NewAppointmentForm extends React.Component {
  state = {
    newAppointment: defaultAppointment,
    newComment: defaultComment,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value;
    this.setState({ newAppointment: tempAppointment });
  }

  appointmentChange = e => this.formFieldStringState('appointment', e);

  dateChange = e => this.formFieldStringState('date', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  acresChange = (e) => {
    this.estimatePrice(e);
  }

  inputFieldStringState = (name, e) => {
    e.preventDefault();
    const tempComment = { ...this.state.newComment };
    tempComment[name] = e.target.value;
    this.setState({ newComment: tempComment });
  }

commentChange = e => this.inputFieldStringState('comment', e);

  addAppointment = (newAppointment) => {
    appointmentRequests.postRequest(newAppointment)
      .then(() => {
        appointmentRequests.getAllAppointments()
          .then((appointments) => {
            this.setState({ appointments });
          });
      })
      .catch(err => console.error('error with appointments post', err));
  }

  estimatePrice = (e) => {
    e.preventDefault();
    const acreNumber = e.target.value;
    const myPrice = acreNumber*50;
    const myAppointment = { ...this.state.newAppointment };
    myAppointment.price = myPrice;
    myAppointment.acres = acreNumber
    this.setState({ newAppointment: myAppointment });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myAppointment = { ...this.state.newAppointment };
    myAppointment.uid = authRequests.getCurrentUid();
    this.addAppointment(myAppointment);
    this.setState({ newAppointment: defaultAppointment });
  }

inputSubmitEvnt = (newComment) => {
  newComment.uid = authRequests.getCurrentUid();
    messageRequests.createMessage(newComment)
      .then(() => {
      }).catch(err => console.error(err));
  } 

  render() {
    const { newAppointment, newComment } = this.state;
    return (
      <div className="newAppointmentContainer mt-5">
        <form onSubmit={this.formSubmit}>
          <div className="newAppointmentForm">
            <div className="newAppointmentHeader">Appointment Details</div>
              <div className="topRow">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  value={newAppointment.firstName}
                  onChange={this.firstNameChange}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  value={newAppointment.lastName}
                  onChange={this.lastNameChange}
                />
              </div>
              <div className="midRow">
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  value={newAppointment.address}
                  onChange={this.addressChange}
                />
                <input 
                  type="text"
                  placeholder="City"
                  className="form-control"
                  value={newAppointment.city}
                  onChange={this.cityChange}
                />
                <h3>Get Instant Quote!</h3>
              </div>
              <div className="bottomRow">
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={newAppointment.date}
                  onChange={this.dateChange}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="form-control"
                  value={newAppointment.state}
                  onChange={this.stateChange}
                />
                <input
                  type="number"
                  placeholder="Acres"
                  className="form-control"
                  value={newAppointment.acres}
                  onChange={this.acresChange}
                />
              </div>
              <div className="commentHeader"><h3>Leave us a message!</h3></div>
              <div className="commentAndPrice">
              <textarea
                type="text"
                className="commentInput"
                placeholder="Comments/Message"
                value={newComment.message}
                onChange={this.commentChange}
              />
              <div className="estimate">
                <h1>${newAppointment.price}</h1>
              </div>
              <div className="">
              <p>is your quote</p>
              </div>
              </div>
              <div className="makeAppointment">
              <button
                onClick={this.addAppointment && this.inputSubmitEvnt}
                className="btn btn-success">
                Make Appointment
              </button>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewAppointmentForm;
