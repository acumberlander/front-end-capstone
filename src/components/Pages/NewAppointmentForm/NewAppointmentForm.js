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
    e.persist();
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value;
    this.setState({ newAppointment: tempAppointment });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    e.persist()
    const myPrice = e.target.value*50;
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value*1;
    tempAppointment.price = myPrice;
    this.setState({ newAppointment: tempAppointment });
  }

  // estimatePrice = (e) => {
  //   e.preventDefault();
  //   const acreNumber = e.target.value;
  //   const myPrice = acreNumber*50;
  //   const myAppointment = { ...this.state.newAppointment };
  //   myAppointment.price = myPrice;
  //   myAppointment.acres = acreNumber
  //   this.setState({ newAppointment: myAppointment });
  // }

  appointmentChange = e => this.formFieldStringState('appointment', e);

  dateChange = e => this.formFieldStringState('date', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  acresChange = e => this.formFieldNumberState('acres', e);

  inputFieldStringState = (name, e) => {
    e.preventDefault();
    e.stopPropagation();
    const uid = authRequests.getCurrentUid();    
    const tempComment = { ...this.state.newComment };
    tempComment[name] = e.target.value;
    tempComment.uid = uid;
    this.setState({ newComment: tempComment });
  }

commentChange = e => this.inputFieldStringState('message', e);

  addAppointment = (newAppointment, newComment) => {
    const uid = authRequests.getCurrentUid();    
    messageRequests.createMessage(newComment);
    appointmentRequests.postRequest(newAppointment)
      .then(() => {
        appointmentRequests.getAllAppsByUid(uid)
          .then((appointments) => {
            this.setState({ appointments });
            this.props.history.push(`/appointments`);
          });
      })
      .catch(err => console.error('error with appointments post', err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    const myAppointment = { ...this.state.newAppointment };
    const myComment = { ...this.state.newComment };
    myAppointment.uid = authRequests.getCurrentUid();
    this.addAppointment(myAppointment, myComment);
    this.setState({ newAppointment: defaultAppointment, newComment: defaultComment });
  }

// inputSubmitEvnt = (newComment) => {
//   newComment.uid = authRequests.getCurrentUid();
//     messageRequests.createMessage(newComment)
//       .then(() => {
//       }).catch(err => console.error(err));
//   } 

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
                onClick={this.formSubmit}
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
