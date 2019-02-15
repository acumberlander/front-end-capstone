import React from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
// import Modal from 'react-responsive-modal';
import authRequests from '../../../Helpers/Data/authRequests';



class Appointments extends React.Component {
  state = {
    appointments: [],
    isEditing: false,
    editId: '-1',
    open: false,
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    appointmentRequests.getAllAppsByUid(uid)
      .then((appointments) => {
        this.setState({ appointments });
      })
      .catch((error) => {
        console.error('error on getAllAppsByUid', error);
      });
  }

  formSubmitAppointment = (newAppointment) => {
    const { isEditing, editId } = this.state;
    const uid = authRequests.getCurrentUid();
    if (isEditing) {
      appointmentRequests.updateAppointment(editId, newAppointment)
        .then(() => {
          appointmentRequests.getAllAppsByUid(uid)
            .then((appointments) => {
              this.setState({ appointments, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with appointments post', err));
    }
  };

  deleteAppointment = (appointmentId) => {
    const uid = authRequests.getCurrentUid();
    appointmentRequests.deleteAppointment(appointmentId)
      .then(() => {
        appointmentRequests.getAllAppsByUid(uid)
          .then((appointments) => {
            this.setState({ appointments });
          });
      })
      .catch(err => console.error('error with delete appointment', err));
  }

  render() {
    const passAppointmentToEdit = (appointmentId) => {
      this.setState({ isEditing: true, editId: appointmentId });
    };
    
    const {
      appointments,
      isEditing,
      editId,
    } = this.state;
    const appointmentItemComponents = appointments.map(appointment => (
      <div>
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          deleteAppointment={this.deleteAppointment}
          passAppointmentToEdit={passAppointmentToEdit}
          onSubmit={this.formSubmitAppointment}
          isEditing={isEditing}
          editId={editId}
        />
      </div>
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
        </div>
      </div>
    );
  }
}

export default Appointments;
