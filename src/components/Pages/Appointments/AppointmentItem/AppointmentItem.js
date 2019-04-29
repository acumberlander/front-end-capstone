import React from 'react';
import PropTypes from 'prop-types';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';
import './AppointmentItem.scss';
import authRequests from '../../../../Helpers/Data/authRequests';
import moment from 'moment';
import appointmentRequests from '../../../../Helpers/Data/Requests/appointmentRequests';
import Modal from 'react-responsive-modal';

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

class AppointmentItem extends React.Component {
  static propTypes = {
    appointment: appointmentShape,
    deleteAppointment: PropTypes.func,
    editAppointment: PropTypes.func,
    passAppointmentToEdit: PropTypes.func,
    formSubmitAppointment: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  state = {
    newAppointment: defaultAppointment,
    open: false,
  }

  deleteAppointment = (e) => {
    e.preventDefault();
    const { deleteAppointment, appointment } = this.props;
    deleteAppointment(appointment.id);
  }

  editAppointment = (e) => {
    e.preventDefault();
    const { passAppointmentToEdit, appointment } = this.props;
    passAppointmentToEdit(appointment.id);
    this.setState({ open: true });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempAppointment = { ...this.props.appointment };
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
    this.setState({ newAppointment: defaultAppointment, open: false });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      appointmentRequests.getAppointmentItem(editId)
        .then((appointment) => {
          const date = moment(appointment.date).format('MM/DD/YYYY')
          appointment.data.date = date;
          this.setState({ newAppointment: appointment.data });
        })
        .catch(err => console.error('error when getAppointmentItem', err));
    } else {
    }
  }
  
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, newAppointment } = this.state;
    const { appointment, isEditing, editId } = this.props;

    let statusColor = 'appointmentContainer m-3 isPending';
    if (appointment.status === 'approved') {
      statusColor = 'appointmentContainer m-3 isApproved';
    } else if (appointment.status === 'cancelled') {
      statusColor = 'appointmentContainer m-3 isCancelled';
    } else {
      statusColor = 'appointmentContainer m-3 isPending';
    }

    const uid = authRequests.getCurrentUid();
    const makeEditButton = () => {
      if (appointment.uid === uid) {
        return (
          <div id="editButtonDiv">
            <span className="">
              <button className="btn btn-default" onClick={this.editAppointment}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
          </div>
        );
      }
    }
    const makeDeleteButton = () => {
      if (appointment.uid === uid) {
        return (
          <div id="deleteButtonDiv">
            <span className="">
              <button className="btn btn-default" onClick={this.deleteAppointment}>
                <i className="fas fa-times-circle"></i>
              </button>
            </span>
          </div>
        )
      }
    };
    return (
      <div className="appointmentItemContainer">
        <div className="AppointmentItem">
          <div className="appFirstCol col-4">
          <div className="customerInfoContainer">
            <p className="m-0 p-0 custInfoHeader">Customer Info</p>
            <hr className="appBreakLine"></hr>
            <div id="nameLine">{appointment.firstName} {appointment.lastName}</div>
            <div id="addressSection">
              <div id="addressLine">{appointment.address}</div>
              <div id="cityStateLine">{appointment.city}, {appointment.state}</div>
            </div>
          </div>
          <div className="serviceQuoteContainer">
            <p className="serviceHeader m-0">Quote Estimate</p>
            <hr className="appBreakLine"></hr>
            <h2 id="priceTag">${appointment.price}</h2>
          </div>
        </div>
        <div className="appSecondCol col-4">
          <div className="dateContainer">
            <p className="dateHeader m-0">Date</p>
            <hr className="appBreakLine"></hr>
            <div className="dateDiv">{moment(appointment.date).format('MM/DD/YYYY')}</div>
          </div>
        </div>
        <div className="moveEditAndDelete col-1 m-0 p-0">
          <div className="moveDeleteButton">{makeDeleteButton()}</div>
          <div className="moveEditButton">{makeEditButton()}</div>
        </div>
          <Modal
        open={open}
        onClose={this.onCloseModal}
        isEditing={isEditing}
        editId={editId}>
          <div className="formContainer">
          <form onSubmit={this.formSubmit}>
            <div className="form-group">
              <label className="" htmlFor="firstName"><h5>First Name</h5></label>
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
              <label className="" htmlFor="lastName"><h5>Last Name</h5></label>
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
              <label className="" htmlFor="date"><h5>Date</h5></label>
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
              <label className="" htmlFor="address"><h5>Address</h5></label>
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
              <label className="" htmlFor="city"><h5>City</h5></label>
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
              <label className="" htmlFor="state"><h5>State</h5></label>
              <input
                type="text"
                className="form-control"
                id="state"
                placeholder="State"
                value={newAppointment.state}
                onChange={this.stateChange}
              />
            </div>
            <div className="saveEventButton">
              <button className="btn btn-danger">
                Save Event
              </button>
            </div>
          </form>
        </div>
      </Modal>
        </div>
      </div>
    );
  }
}

export default AppointmentItem;
