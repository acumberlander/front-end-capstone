import React from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
// import Form from '../Form/Form';
import authRequests from '../../../Helpers/Data/authRequests';



class Appointments extends React.Component {
  state = {
    appointments: [],
    isEditing: false,
    editId: '-1',
    open: false,
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

  // formSubmit = (e) => {
  //   e.preventDefault();
  //   const { onSubmit } = this.state;
  //   const myAppointment = { ...this.state.newAppointment };
  //   myAppointment.uid = authRequests.getCurrentUid();
  //   onSubmit(myAppointment);
  //   this.setState({ newAppointment: defaultAppointment });
  // }

  componentDidUpdate(prevState) {
    const { isEditing, editId } = this.state;
    if (prevState !== this.state && isEditing) {
      appointmentRequests.getAppointmentItem(editId)
        .then((appointment) => {
          this.setState({ newAppointment: appointment.data });
        })
        .catch(err => console.error('error when getAppointmentItem', err));
    }
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
        </div>
        </div>
    );
  }
}

export default Appointments;
