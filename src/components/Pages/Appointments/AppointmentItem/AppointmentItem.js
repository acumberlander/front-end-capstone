import React, { useEffect, useState } from 'react';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';

import './AppointmentItem.scss';
import authRequests from '../../../../Helpers/Data/authRequests';
import moment from 'moment';
import appointmentRequests from '../../../../Helpers/Data/Requests/appointmentRequests';
import Modal from 'react-responsive-modal';
import weatherRequest from '../../../../Helpers/Data/Requests/weatherRequest';
import sunny from '../../../../img/weatherIcons/day.svg';
import cloudy from '../../../../img/weatherIcons/cloudy.svg';
import partlyCloudy from '../../../../img/weatherIcons/cloudy-day-1.svg';
import thunderStorm from '../../../../img/weatherIcons/thunder.svg';
import rain from '../../../../img/weatherIcons/rainy-6.svg';
import snow from '../../../../img/weatherIcons/snowy-1.svg';

const defaultAppointment = {
	firstName: '',
	lastName: '',
	date: '',
	time: '',
	status: '',
	address: '',
	city: '',
	state: '',
	acres: '',
	uid: '',
};

const defaultWeather = {
	tempHigh: '',
	tempLow: '',
	description: '',
	weatherIcon: '',
};

const AppointmentItem = ({
	appointment,
	_deleteAppointment,
	passAppointmentToEdit,
	isEditing,
	editId,
	onSubmit,
}) => {
	const [newAppointment, setNewAppoinment] = useState(defaultAppointment);
	const [open, setOpen] = useState(false);
	const [weather, setWeather] = useState(defaultWeather);

	// Function that allows user to delete appointment
	const deleteAppointment = (e) => {
		e.preventDefault();

		/* This function makes a DELETE request to firebase and then a GET request
       and then sets the state of the appointment data comes back. */
		_deleteAppointment(appointment.id);
	};

	// Function that allows user to edit appointment
	const editAppointment = (e) => {
		e.preventDefault();

		// Function that sets the state of the EditId to the appointmentId.
		passAppointmentToEdit(appointment.id);

		// Opens the modal
		setOpen(true);
	};

	/* Function that changes the state of appointment data in realtime. 
     However, in order for it to work, the correct data field has to be passed in as parameter.
     An event (e) must also occur. */
	const formFieldStringState = (name, e) => {
		e.preventDefault();
		/* Sets variable to the value of each individual value in the appointmentShape object.
       It does this by using the spread operator. ie: '...' */
		const tempAppointment = { ...appointment };
		tempAppointment[name] = e.target.value;
		setNewAppoinment(tempAppointment);
	};

	/* Each change function below runs the formFieldStringState function and
     passes in the appointment property that's being edited and the event (e)
     that changes the state of each property.  */
	const dateChange = (e) => formFieldStringState('date', e);

	const addressChange = (e) => formFieldStringState('address', e);

	const cityChange = (e) => formFieldStringState('city', e);

	const stateChange = (e) => formFieldStringState('state', e);

	const lastNameChange = (e) => formFieldStringState('lastName', e);

	const firstNameChange = (e) => formFieldStringState('firstName', e);

	// Function that submits/saves the newly edited appointment and closes the modal
	const formSubmit = (e) => {
		e.preventDefault();
		const myAppointment = { ...newAppointment };
		myAppointment.uid = authRequests.getCurrentUid();
		onSubmit(myAppointment);
		setNewAppoinment(defaultAppointment);
		setOpen(false);
	};

	// Lifecycle method that runs when the component updates
	useEffect(() => {
		if (isEditing) {
			// Gets the appointment item from firebase based on the 'editId' that's passed in
			appointmentRequests
				.getAppointmentItem(editId)
				.then((appointment) => {
					/* Sets the state of the newAppointment with the data that returned 
           so that it will populate when the modal is opened
           and the user wants to make edits. */
					setNewAppoinment(appointment.data);
					console.log(appointment.data);
					console.log(newAppointment);
				})
				.catch((err) => console.error('error when getAppointmentItem', err));
		}
	}, []);

	// function that closes the edit appointment modal
	const onCloseModal = () => {
		setOpen(false);
	};

	/* This function gets the current weather data from an api
     and then sets that data to the weather state. */
	const renderWeather = () => {
		// Api GET request that returns an array of 16 day objects
		weatherRequest
			.getForecast(appointment.city, appointment.state)
			.then((forecast16) => {
				// Logic to select the day that matches with the appointment date
				for (let i = 0; i < forecast16.data.length; i++) {
					let theDay = forecast16.data[i];
					if (theDay.datetime === appointment.date) {
						// Setting the value for each weather property
						let tempHigh = (weather.tempHigh = theDay.max_temp);
						let tempLow = (weather.tempLow = theDay.min_temp);
						let desc = (weather.description = theDay.weather.description);
						let icon = (weather.weatherIcon = theDay.weather.icon);

						// Defining an object so that it can be used to set the state of the weather
						let currentWeather = {
							tempHigh: tempHigh,
							tempLow: tempLow,
							description: desc,
							weatherIcon: icon,
						};

						// Using 'currentWeather' object to set the state of weather
						setWeather(currentWeather);
					}
				}
			});
	};

	// Lifecycle method that will run the function within it when this component loads
	useEffect(() => {
		renderWeather();
	}, []);

	const uid = authRequests.getCurrentUid();
	let weatherIcon = '';

	let sunnyWeather = ['c01d', 'c01n'];
	let partlyCloudyWeather = ['c02d', 'c02n'];
	let cloudyWeather = ['c03d', 'c03n', 'c04d', 'c04n'];
	let snowyWeather = [
		's01d',
		's01n',
		's02d',
		's02n',
		's03d',
		's03n',
		's04d',
		's04n',
	];
	let thunderWeather = [
		't01d',
		't01n',
		't02d',
		't02n',
		't05d',
		't05n',
		't03d',
		't03n',
		't04d',
		't04n',
		't04d',
		't04n',
	];
	let rainyWeather = [
		'r01d',
		'r01dn',
		'r04d',
		'r04n',
		'r05d',
		'r05n',
		'r06d',
		'r06n',
		'r02d',
		'r02n',
		'r03d',
		'r03n',
	];

	// Weather icon logic
	sunnyWeather.forEach((code) => {
		if (weather.weatherIcon === code) {
			weatherIcon = sunny;
		}
	});

	partlyCloudyWeather.forEach((code) => {
		if (weather.weatherIcon === code) {
			weatherIcon = partlyCloudy;
		}
	});

	cloudyWeather.forEach((code) => {
		if (weather.weatherIcon === code) {
			weatherIcon = cloudy;
		}
	});

	thunderWeather.forEach((code) => {
		if (weather.weatherIcon === code) {
			weatherIcon = thunderStorm;
		}
	});

	rainyWeather.forEach((code) => {
		if (weather.weatherIcon === code) {
			weatherIcon = rain;
		}
	});

	snowyWeather.forEach((code) => {
		if (weather.weatherIcon === code) {
			weatherIcon = snow;
		}
	});

	// Function that renders the edit button on each appointment item
	const makeEditButton = () => {
		if (appointment.uid === uid) {
			return (
				<div id="editButtonDiv">
					<span className="">
						<button className="btn btn-default" onClick={editAppointment}>
							<i className="fas fa-pencil-alt" />
						</button>
					</span>
				</div>
			);
		}
	};

	// Function that renders the delete button on each appointment item
	const makeDeleteButton = () => {
		if (appointment.uid === uid) {
			return (
				<div id="deleteButtonDiv">
					<span className="">
						<button className="btn btn-default" onClick={deleteAppointment}>
							<i className="fas fa-times-circle" />
						</button>
					</span>
				</div>
			);
		}
	};

	return (
		<div className="appointmentItemContainer">
			<div className="AppointmentItem">
				<div className="appFirstCol col-4">
					<div className="customerInfoContainer">
						<p className="m-0 p-0 custInfoHeader">Customer Info</p>
						<hr className="appBreakLine" />
						<div id="nameLine">
							{appointment.firstName} {appointment.lastName}
						</div>
						<div id="addressSection">
							<div id="addressLine">{appointment.address}</div>
							<div id="cityStateLine">
								{appointment.city}, {appointment.state}
							</div>
						</div>
					</div>
					<div className="serviceQuoteContainer">
						<p className="serviceHeader m-0">Quote Estimate</p>
						<hr className="appBreakLine" />
						<h2 id="priceTag">${appointment.price}</h2>
					</div>
				</div>
				<div className="appSecondCol col-4">
					<div className="dateContainer">
						<p className="dateHeader m-0">Date</p>
						<hr className="appBreakLine" />
						<div className="dateDiv">
							{moment(appointment.date).format('MM/DD/YYYY')}
						</div>
					</div>
					<div className="" id="weatherSoonDiv">
						<div id="weatherIconDiv">
							<img id="weatherIcon" src={weatherIcon} alt="weather icon" />
							<div id="weathertext">
								<p>High: {weather.tempHigh}</p>
								<p>Low: {weather.tempLow}</p>
								<p>{weather.description}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="moveEditAndDelete col-1 m-0 p-0">
					<div className="moveDeleteButton">{makeDeleteButton()}</div>
					<div className="moveEditButton">{makeEditButton()}</div>
				</div>
				<Modal
					open={open}
					onClose={onCloseModal}
					isEditing={isEditing}
					editId={editId}
				>
					<div className="formContainer">
						<form className="modalForm">
							<div id="modalInputs">
								<div className="firstModalColumn">
									<div className="form-group">
										<div className="labelDiv">
											<label className="" htmlFor="firstName">
												<h5>First Name</h5>
											</label>
										</div>
										<input
											type="text"
											className="form-control"
											id="firstName"
											placeholder="First Name"
											value={newAppointment.firstName}
											onChange={firstNameChange}
										/>
									</div>
									<div className="form-group">
										<div className="labelDiv">
											<label className="" htmlFor="lastName">
												<h5>Last Name</h5>
											</label>
										</div>
										<input
											type="text"
											className="form-control"
											id="lastName"
											placeholder="Last Name"
											value={newAppointment.lastName}
											onChange={lastNameChange}
										/>
									</div>
									<div className="form-group">
										<div className="labelDiv">
											<label className="" htmlFor="date">
												<h5>Date</h5>
											</label>
										</div>
										<input
											type="date"
											className="form-control"
											id="date"
											placeholder="Date"
											value={newAppointment.date}
											onChange={dateChange}
										/>
									</div>
								</div>
								<div className="secondModalColumn">
									<div className="form-group">
										<div className="labelDiv">
											<label className="" htmlFor="address">
												<h5>Address</h5>
											</label>
										</div>
										<input
											type="text"
											className="form-control"
											id="address"
											placeholder="Address"
											value={newAppointment.address}
											onChange={addressChange}
										/>
									</div>
									<div className="form-group">
										<div className="labelDiv">
											<label className="" htmlFor="city">
												<h5>City</h5>
											</label>
										</div>
										<input
											type="text"
											className="form-control"
											id="city"
											placeholder="City"
											value={newAppointment.city}
											onChange={cityChange}
										/>
									</div>
									<div className="form-group">
										<div className="labelDiv">
											<label className="" htmlFor="state">
												<h5>State</h5>
											</label>
										</div>
										<input
											type="text"
											className="form-control"
											id="state"
											placeholder="State"
											value={newAppointment.state}
											onChange={stateChange}
										/>
									</div>
								</div>
							</div>
						</form>
						<div className="saveEventButton">
							<button className="btn btn-danger" onClick={formSubmit}>
								Save Changes
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
};

AppointmentItem.propTypes = {
	appointment: appointmentShape,
};

export default AppointmentItem;
