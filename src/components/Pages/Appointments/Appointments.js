import React, { useState, useEffect } from 'react';
import './Appointments.scss';
import AppointmentItem from './AppointmentItem/AppointmentItem';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import { TextField, Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';

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
				console.log(appointments);
			})
			.catch((error) => {
				console.error('error on getAllAppsByUid', error);
			});
	}, []);

	// const formSubmitAppointment = (newAppointment) => {
	// 	const uid = authRequests.getCurrentUid();
	// 	if (isEditing) {
	// 		appointmentRequests
	// 			.updateAppointment(editId, newAppointment)
	// 			.then(() => {
	// 				appointmentRequests.getAllAppsByUid(uid).then((appointments) => {
	// 					setAppointments(appointments);
	// 					setIsEditing(false);
	// 					setEditId('-1');
	// 				});
	// 			})
	// 			.catch((err) => console.error('error with appointments post', err));
	// 	}
	// };

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

	// const appointmentItemComponents = appointments.map((appointment) => (
	// 	<AppointmentItem
	// 		key={appointment.id}
	// 		appointment={appointment}
	// 		_deleteAppointment={deleteAppointment}
	// 		passAppointmentToEdit={passAppointmentToEdit}
	// 		onSubmit={formSubmitAppointment}
	// 		isEditing={isEditing}
	// 		editId={editId}
	// 	/>
	// ));

	const columns = [
		{
			title: 'Address',
			field: 'address',
		},
		{
			title: 'City',
			field: 'city',
		},
		{
			title: 'State',
			field: 'state',
		},
		{
			title: 'Date',
			field: 'date',
		},
		{
			title: 'Time',
			field: 'time',
		},
		{
			title: 'Quote',
			field: 'quote',
		},
		{
			title: 'Servicer',
			field: 'servicer',
		},
	];

	const actions = [
		{
			icon: 'delete',
			tooltip: 'Delete Appointment',
			onClick: (e, rowData) => deleteAppointment(rowData.id),
		},
		{
			icon: 'edit',
			tooltip: 'Edit Appointment',
			onClick: (e, rowData) => passAppointmentToEdit(rowData.id),
		},
	];

	console.log(actions);

	return (
		<div className="appointments-outer-div">
			<div className="d-flex new-appointment-top">
				<TextField
					label="Lawn Servicer"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					type="date"
					label="Date"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					type="time"
					label="Time"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					label="Acres"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
				/>
				<div>
					<p className="quote">Estimated Quote</p>
					<h2>$100</h2>
				</div>
				<Button variant="contained" color="primary">
					Create Appointment
				</Button>
			</div>
			<div className="appointmentsContainer d-flex justify-content-center">
				<MaterialTable
					title="Appointments"
					data={appointments}
					columns={columns}
					style={{ width: '1100px', marginTop: '20px' }}
					actions={actions}
					options={{ actionsColumnIndex: -1 }}
				/>
			</div>
		</div>
	);
};

export default Appointments;
