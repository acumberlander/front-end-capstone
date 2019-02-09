import React from 'react';
import PropTypes from 'prop-types';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';
import './AppointmentItem.scss';
import authRequests from '../../../../Helpers/Data/authRequests';
import moment from 'moment';

class AppointmentItem extends React.Component {
  static propTypes = {
    appointment: appointmentShape,
    deleteAppointment: PropTypes.func,
    editAppointment: PropTypes.func,
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

  render() {
    const { appointment } = this.props;

    let statusColor = 'appointmentContainer m-3 isPending';
    if (appointment.status === 'approved') {
      statusColor = 'appointmentContainer m-3 isApproved';
    } else if (appointment.status === 'cancelled') {
      statusColor = 'appointmentContainer m-3 isCancelled';
    } else {
      statusColor = 'appointmentContainer m-3 isPending';
    }

    const uid = authRequests.getCurrentUid();
    console.log(uid);
    console.log(appointment.uid);

    const makeEditButton = () => {
      if (appointment.uid === uid) {
        return (
          <div>
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
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteAppointment}>
                <i className="fas fa-times-circle"></i>
              </button>
            </span>
          </div>
        )
      }
    };
    return (
      <div className={statusColor}>
        <div className="AppointmentItem text-center">
          <div className="appointmentCardHeader">
            <span className="dateSpan">{moment(appointment.date).format('MM/DD/YYYY')}</span>
            <span>{makeDeleteButton()}</span>
          </div>
          <div className="appointmentStatus">
            <h3>Appointment {appointment.status === "" ? appointment.status = "is pending" : appointment.status}</h3>
          </div>
          <div className="serviceQuote">
            <h1>${appointment.price}</h1>
          </div>
          <div className="addressInfo">
            <p>{appointment.address}</p>
            <p>{appointment.city}, {appointment.state}</p>
          </div>
          {makeEditButton()}
        </div>
      </div>
    );
  }
}

export default AppointmentItem;
