import React from 'react';
import './NewAppointmentForm.scss';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import authRequests from '../../../Helpers/Data/authRequests';

const defaultAppointment = {
  firstName: '',
  lastName: '',
  date: '',
  status: '',
  address: '',
  city: '',
  state: '',
  acres: '',
  uid: '',
};

class NewAppointmentForm extends React.Component {


  state = {
    newAppointment: defaultAppointment,
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

  acresChange = e => this.formFieldStringState('acres', e);

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


  formSubmit = (e) => {
    e.preventDefault();
    const myAppointment = { ...this.state.newAppointment };
    myAppointment.uid = authRequests.getCurrentUid();
    this.addAppointment(myAppointment);
    this.setState({ newAppointment: defaultAppointment });
  }

 
  render() {
    const { newAppointment } = this.state;
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
                className="commentInput"
                placeholder="Comments/Message" 
              />
              <div className="">
                <h1>$65</h1>
              </div>
              <div className="">
              <p>is your quote</p>
              </div>
              </div>
              <div className="makeAppointment">
              <button onClick={this.addAppointment} className="btn btn-success">
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
