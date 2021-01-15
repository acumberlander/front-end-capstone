import React, { useState, useEffect } from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import authRequests from '../../../Helpers/Data/authRequests';

const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState('-1');

	useEffect(() => {
		const uid = authRequests.getCurrentUid();
		appointmentRequests
			.getAllAppsByUid(uid)
			.then((appointments) => {
				setAppointments(appointments);
			})
			.catch((error) => {
				console.error('error on getAllAppsByUid', error);
			});
	}, []);

	const formSubmitAppointment = (newAppointment) => {
		const uid = authRequests.getCurrentUid();
		if (isEditing) {
			appointmentRequests
				.updateAppointment(editId, newAppointment)
				.then(() => {
					appointmentRequests.getAllAppsByUid(uid).then((appointments) => {
						setAppointments(appointments);
						setIsEditing(false);
						setEditId('-1');
					});
				})
				.catch((err) => console.error('error with appointments post', err));
		}
	};

	const deleteAppointment = (appointmentId) => {
		const uid = authRequests.getCurrentUid();
		appointmentRequests
			.deleteAppointment(appointmentId)
			.then(() => {
				appointmentRequests.getAllAppsByUid(uid).then((appointments) => {
					setAppointments(appointments);
				});
			})
			.catch((err) => console.error('error with delete appointment', err));
	};

	const passAppointmentToEdit = (appointmentId) => {
		setIsEditing(true);
		setEditId(appointmentId);
	};

	const appointmentItemComponents = appointments.map((appointment) => (
		<AppointmentItem
			key={appointment.id}
			appointment={appointment}
			_deleteAppointment={deleteAppointment}
			passAppointmentToEdit={passAppointmentToEdit}
			onSubmit={formSubmitAppointment}
			isEditing={isEditing}
			editId={editId}
		/>
	));
	return (
		<div className="appointmentsOuterDiv">
			<div className="appointmentHeader">
				<h1>Appointments</h1>
				<hr className="appHeaderLine" />
			</div>
			<div className="appointmentsContainer d-flex justify-content-center">
				<div className="appointmentCards">{appointmentItemComponents}</div>
			</div>
			<div className="editAppointment" />
		</div>
	);
};

export default Appointments;
