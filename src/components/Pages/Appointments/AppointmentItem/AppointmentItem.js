import React from 'react';
import PropTypes from 'prop-types';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';
import './AppointmentItem.scss';
import authRequests from '../../../../Helpers/Data/authRequests';

class AppointmentItem extends React.Component {
  static propTypes = {
    appointment: appointmentShape.appointmentShape,
  }
  render() {
    const { appointment } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (appointment.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.editAppointment}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteAppointment}>
                <i className="fas fa-times-circle"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="appointmentContainer card">
        <div className="AppointmentItem text-center mx-auto">
          <h2>{appointment.date}</h2>
          <h2>{appointment.address}</h2>
          <h2>{appointment.city}, {appointment.state}</h2>
        </div>
      </div>
    );
  }
}

export default AppointmentItem;
