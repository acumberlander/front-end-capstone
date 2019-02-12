// import React from 'react';
// import './ServiceApps.scss';
// import ServiceAppItem from './ServiceAppItem/ServiceAppItem';
// import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
// import Form from '../Form/Form';
// import authRequests from '../../../Helpers/Data/authRequests';

// class ServiceApps extends React.Component {
//   state = {
//     appointments: [],
//     isEditing: false,
//     editId: '-1',
//   }

//   componentDidMount() {
//     const uid = authRequests.getCurrentUid();
//     appointmentRequests.getAllAppsByUid(uid)
//       .then((appointments) => {
//         this.setState({ appointments });
//       })
//       .catch((error) => {
//         console.error('error on getAllAppsByUid', error);
//       });
//   }

//   formSubmitAppointment = (newAppointment) => {
//     const { isEditing, editId } = this.state;
//     const uid = authRequests.getCurrentUid();
//     if (isEditing) {
//       appointmentRequests.updateAppointment(editId, newAppointment)
//         .then(() => {
//           appointmentRequests.getAllAppsByUid(uid)
//             .then((appointments) => {
//               this.setState({
//                  appointments, isEditing: false, editId: '-1' });
//             });
//         })
//         .catch(err => console.error('error with appointments post', err));
//     } else {
//       appointmentRequests.postRequest(newAppointment)
//         .then(() => {
//           appointmentRequests.getAllAppsByUid(uid)
//             .then((appointments) => {
//               this.setState({ appointments });
//             });
//         })
//         .catch(err => console.error('error with appointments post', err));
//     }
//   };

//   passAppointmentToEdit = appointmentId => this.setState({ isEditing: true, editId: appointmentId });

//   deleteAppointment = (appointmentId) => {
//     const uid = authRequests.getCurrentUid();
//     appointmentRequests.deleteAppointment(appointmentId)
//       .then(() => {
//         appointmentRequests.getAllAppsByUid(uid)
//           .then((appointments) => {
//             this.setState({ appointments });
//           });
//       })
//       .catch(err => console.error('error with delete appointment', err));
//   }

//   render() {
//     const passAppointmentToEdit = (appointmentId) => {
//       this.setState({ isEditing: true, editId: appointmentId });
//     };

//     const {
//       appointments,
//       isEditing,
//       editId,
//     } = this.state;
//     const appointmentItemComponents = appointments.map(appointment => (
//       <ServiceAppItem
//         key={appointment.id}
//         appointment={appointment}
//         deleteAppointment={this.deleteAppointment}
//         passAppointmentToEdit={passAppointmentToEdit}
//       />
//     ));
//     return (
//       <div className="serviceApps col">
//         <h2>Appointments Component</h2>
//         <div className="serviceAppContainer">
//           <div className="serviceAppCards">
//             {appointmentItemComponents}
//           </div>
//         </div>
//         <div className="editServiceApp">
//           <Form
//             onSubmit={this.formSubmitAppointment}
//             isEditing={isEditing}
//             editId={editId}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default ServiceApps;
