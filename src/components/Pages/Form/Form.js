import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
import authRequests from '../../../Helpers/Data/authRequests';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';


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

class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

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

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myAppointment = { ...this.state.newAppointment };
    myAppointment.uid = authRequests.getCurrentUid();
    onSubmit(myAppointment);
    this.setState({ newAppointment: defaultAppointment });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      appointmentRequests.getAppointmentItem(editId)
        .then((appointment) => {
          this.setState({ newAppointment: appointment.data });
        })
        .catch(err => console.error('error when getAppointmentItem', err));
    }
  }

  render() {
    const { newAppointment } = this.state;
    if (this.props.isEditing) {
    return (
      <div className="formContainer">
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={newAppointment.firstName}
              onChange={this.firstNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={newAppointment.lastName}
              onChange={this.lastNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              className="form-control"
              id="date"
              placeholder="Date"
              value={newAppointment.date}
              onChange={this.dateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
              value={newAppointment.address}
              onChange={this.addressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              value={newAppointment.city}
              onChange={this.cityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="State"
              value={newAppointment.state}
              onChange={this.stateChange}
            />
          </div>
          <button className="btn btn-danger">
            Save Event
          </button>
        </form>
      </div>
    )} else {
      return null;
    }
  }
}

export default Form;
