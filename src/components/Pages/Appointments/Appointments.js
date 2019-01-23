import React from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
// import authRequests from '../../../Helpers/Data/authRequests';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';

class Appointments extends React.Component {
  state = {
    appointments: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    // const currentUid = authRequests.getCurrentUid();
    appointmentRequests.getAllAppointments()
      .then((appointments) => {
        this.setState({ appointments });
      })
      .catch((error) => {
        console.error('error on getAllAppointments', error);
      });
  }

  // formSubmitEvent = (newAppointment) => {
  //   const { isEditing, editId } = this.state;
  //   if (isEditing) {
  //     appointmentRequests.updateAppointment(editId, newAppointment)
  //       .then(() => {
  //         const currentUid = authRequests.getCurrentUid();
  //         appointmentRequests.getAllAppointments(currentUid)
  //           .then((events) => {
  //             this.setState({ events, isEditing: false, editId: '-1' });
  //           });
  //       })
  //       .catch(err => console.error('error with listings post', err));
  //   } else {
  //     appointmentRequests.postRequest(newAppointment)
  //       .then(() => {
  //         const currentUid = authRequests.getCurrentUid();
  //         smashRequests.getEventsFromMeAndFriends(currentUid)
  //           .then((events) => {
  //             this.setState({ events });
  //           });
  //       })
  //       .catch(err => console.error('error with events post', err));
  //   }
  // };

  // passAppointmentToEdit = apopointmentId => this.setState({ isEditing: true, editId: apopointmentId });

  // deleteSingleEvent = (eventId) => {
  //   eventRequests.deleteEvent(eventId)
  //     .then(() => {
  //       const currentUid = authRequests.getCurrentUid();
  //       smashRequests.getEventsFromMeAndFriends(currentUid)
  //         .then((events) => {
  //           this.setState({ events });
  //         });
  //     })
  //     .catch(err => console.error('error with delete single', err));
  // }

  render() {
    // const passEventToEdit = (eventId) => {
    //   this.setState({ isEditing: true, editId: eventId });
    // };

    const {
      appointments,
    } = this.state;
    const appointmentItemComponents = appointments.map(appointment => (
      <AppointmentItem
        appointment={appointment}
        key={appointment.id}
      />
    ));
    return (
      <div className="appointments col">
        <h2>Appointments Component</h2>
        <div className="appointmentsContainer">
          <div className="appointmentCards">
            {appointmentItemComponents}
          </div>
        </div>
      </div>
    );
  }
}

export default Appointments;
