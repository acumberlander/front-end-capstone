import React from 'react';
import './UserHome.scss';

const UserHome = (props) => {
	const changeView = (e) => {
		const view = e.currentTarget.className;
		if (view === 'newAppointment') {
			props.history.push('/newappointmentform');
		} else if (view === 'appointments') {
			props.history.push('/appointments');
		}
	};

	return (
		<div className="Home mx-auto">
			<div className="homeLinksContainer">
				<div className="newAppointment" onClick={changeView}>
					<div id="newAppointmentText">New Appointment</div>
					<div id="newAppointmentsShade" />
					<img
						className="newAppointmentPic"
						id="newappointmentform"
						src={require('../../img/cuttingGrass.jpeg')}
						alt="New Appointment"
					/>
				</div>
				<div className="appointments" onClick={changeView}>
					<div id="appointmentText">Appointments</div>
					<div id="appointmentsShade" />
					<img
						className="appointmentsPic"
						id="appointments"
						src={require('../../img/manicuredGrass.jpeg')}
						alt="New Appointment"
					/>
				</div>
			</div>
		</div>
	);
};

export default UserHome;
