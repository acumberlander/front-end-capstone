import React from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
// import Form from '../Form/Form';
import authRequests from '../../../Helpers/Data/authRequests';
// import Modal from 'react-responsive-modal';

class Appointments extends React.Component {
  state = {
    appointments: [],
    isEditing: false,
    editId: '-1',
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

  onOpenModal = () => {
    this.setState({ open: true });
  };
  
  onCloseModal = () => {
    this.setState({ open: false });
  };

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
    } else {
      appointmentRequests.postRequest(newAppointment)
        .then(() => {
          appointmentRequests.getAllAppsByUid(uid)
            .then((appointments) => {
              this.setState({ appointments });
            });
        })
        .catch(err => console.error('error with appointments post', err));
    }
  };

  passAppointmentToEdit = appointmentId => this.setState({ isEditing: true, editId: appointmentId });

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
      // isEditing,
      // editId,
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
        <div>
          {/* <Modal>
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
                  </div>
                </div>
              </div>
        </Modal> */}
          {/* <Form
            onSubmit={this.formSubmitAppointment}
            isEditing={isEditing}
            editId={editId}
          /> */}
        </div>
        </div>
        </div>
    );
  }
}

export default Appointments;
