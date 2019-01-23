import React from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
// import authRequests from '../../../Helpers/Data/authRequests';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import Form from '../Form/Form';

class Appointments extends React.Component {
  state = {
    appointments: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    appointmentRequests.getAllAppointments()
      .then((appointments) => {
        this.setState({ appointments });
      })
      .catch((error) => {
        console.error('error on getAllAppointments', error);
      });
  }

  formSubmitAppointment = (newAppointment) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      appointmentRequests.updateAppointment(editId, newAppointment)
        .then(() => {
          appointmentRequests.getAllAppointments()
            .then((appointments) => {
              this.setState({ appointments, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    } 
  };

// This is the functionality for creating appointments
    //  {
    //   appointmentRequests.postRequest(newAppointment)
    //     .then(() => {
    //       const currentUid = authRequests.getCurrentUid();
    //       smashRequests.getEventsFromMeAndFriends(currentUid)
    //         .then((events) => {
    //           this.setState({ events });
    //         });
    //     })
    //     .catch(err => console.error('error with events post', err));
    // }

  passAppointmentToEdit = apopointmentId => this.setState({ isEditing: true, editId: apopointmentId });

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
    const passAppointmentToEdit = (apopointmentId) => {
      this.setState({ isEditing: true, editId: apopointmentId });
    };

    const {
      appointments,
      isEditing,
      editId,
    } = this.state;
    const appointmentItemComponents = appointments.map(appointment => (
      <AppointmentItem
      key={appointment.id}
        appointment={appointment}
        deleteAppointment={this.deleteAppointment}
        passAppointmentToEdit={passAppointmentToEdit}
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
        <div className="editAppointment">
          <Form
            onSubmit={this.formSubmitAppointment}
            isEditing={isEditing}
            editId={editId}
          />
        </div>
      </div>
    );
  }
}

export default Appointments;
