import React from 'react';
import './ServiceAppList.scss';
import ServiceAppListItem from './ServiceAppListItem/ServiceAppListItem';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';

class ServiceApps extends React.Component {
  state = {
    appointments: [],
  }

  componentDidMount() {
    appointmentRequests.getAllAppointments()
      .then((appointments) => {
        this.setState({ appointments });
        console.log(appointments);
      })
      .catch((error) => {
        console.error('error on getAllAppointments', error);
      });
  }

  deleteAppointment = (appointmentId) => {
    appointmentRequests.deleteAppointment(appointmentId)
      .then(() => {
        appointmentRequests.getAllAppointments()
          .then((appointments) => {
            this.setState({ appointments });
          });
      })
      .catch(err => console.error('error with delete appointment', err));
  }

  render() {
    const {
      appointments,
    } = this.state;
    const serviceAppListItemComponents = appointments.map(appointment => (
      <ServiceAppListItem
        key={appointment.id}
        appointment={appointment}
        deleteAppointment={this.deleteAppointment}
      />
    ));
    if (this.state.appointments === null) {
      return (
        <div className="serviceAppListContainer">
          <div className="serviceAppListHeader">
            Appointment Requests
          </div>
          <div className="appointmentWindow">
            <div className="serviceAppListCard">
              <div className="noAppointmentsWrapper">
                <h1 className="noAppointments">You have no appointments!</h1>
              </div>
            </div>
          </div>
        </div>
    );
    } else {
      return (
        <div className="serviceAppListContainer">
          <div className="serviceAppListHeader">
            Appointment Requests
          </div>
          <div className="appointmentWindow">
            <div className="serviceAppListCard">
              {serviceAppListItemComponents}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ServiceApps;
