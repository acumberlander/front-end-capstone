import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import PropTypes from 'prop-types';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';
import './ServiceAppListItem.scss';
import moment from 'moment';
import Modal from 'react-responsive-modal';
// import authRequests from '../../../../Helpers/Data/authRequests';
import appointmentRequests from '../../../../Helpers/Data/Requests/appointmentRequests';
  
class ServiceAppListItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      dropdownOpen: false
    }
  }

  static propTypes = {
    appointment: appointmentShape,
    deleteAppointment: PropTypes.func,
    editAppointment: PropTypes.func,
  }

  state = {
    open: false,
    dropdownOpen: false,
  }

toggle() {
  this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });
}

changeStatus = (e) => {
  const appStatus = e.target.innerHTML;
  const appointment  = this.props.appointment;
  appointment.status = appStatus;
  appointmentRequests.updateAppointment(appointment.id, appointment)
    .then(() => {
      appointmentRequests.getAllAppointments()
        .then((appointments) => {
          this.setState({ appointments });
        });
    });
    this.toggle();
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
}

onOpenModal = () => {
  this.setState({ open: true });
};

onCloseModal = () => {
  this.setState({ open: false });
};

  render() {
    const { appointment } = this.props;
    const { open } = this.state;
    let statusColor = 'card pending'
    if (appointment.status === 'approved') {
      statusColor = 'card approved';
    } else if (appointment.status === 'cancelled') {
      statusColor = 'card cancelled';
    } else {
      statusColor = 'card pending';
    }

    return (
      <div className={statusColor} onClick={this.onOpenModal}>
        <div className="serviceAppListItem row">
          <div className="col-3 itemFirstName">
              <span className="">{appointment.firstName}</span>
          </div>
          <div className="col-3 itemAddressHeader">
            Address
          <div>
              <span className="">{appointment.address}</span>
          </div>
          </div>
          <div className="col-3 itemDateHeader">
            Date
          <div>
              <span className="">{moment(appointment.date).format('MM/DD/YYYY')}</span>
          </div>
          </div>
          <div className="col-3 itemStatusHeader">
            Status
          <div>
              <span className="">{appointment.status}</span>
          </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <div>
            <div className="itemHeader"><h2>Appointment Request</h2></div>
              <div className="modalContent">
                <div className="modalColumnOne col-6">
                  <div className="itemName">
                    <h2>Name</h2>
                    <p>{appointment.firstName}</p>
                    <p>{appointment.lastName}</p>
                  </div>
                  <div className="itemAddress">
                    <h2>Address</h2>
                    <p>{appointment.address}</p>
                    <p>{appointment.city}, {appointment.state}</p>
                  </div>
                  <div className="itemPrice">
                    <h2>Price</h2>
                    <p>${appointment.price}</p>
                  </div>
                </div>
                <div className="modalColumnTwo col-6">
                  <div className="itemDate">
                    <h2>Date</h2>
                    <p>{moment(appointment.date).format('MM/DD/YYYY')}</p>
                  </div>
                  <div className="itemStatus">
                    <h2>Status</h2>
                    <p>{appointment.status}</p>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                      className="dropdown1"
                      caret>
                        Select Status
                      </DropdownToggle>
                      <DropdownMenu>
                        <div onClick={this.changeStatus} value="is pending">
                        is pending
                        </div>
                        <div onClick={this.changeStatus} value="approved">
                        approved
                        </div>
                        <div onClick={this.changeStatus} value="cancelled">
                        cancelled
                        </div>
                      </DropdownMenu>
                      </Dropdown>
                  </div>
                </div>
              </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ServiceAppListItem;
