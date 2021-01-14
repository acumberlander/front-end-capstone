import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../Helpers/Data/connection';

import authRequests from '../Helpers/Data/authRequests';
import ServiceAppList from '../components/Pages/ServiceAppList/ServiceAppList';

import {
	UserHome,
	Appointments,
	NewAppointmentForm,
	PickDate,
	NewMemberForm,
	Messages,
	ServicerView,
	CustomerView,
} from '../components';

import './App.scss';
import userRequests from '../Helpers/Data/Requests/userRequests';
import ServiceProviderHome from '../components/Pages/ServiceProviderHome/ServiceProviderHome';

const App = () => {
	const [authed, setAuthed] = useState(false);
	const [currentUid, setCurrentUid] = useState('');
	const [pendingUser, setPendingUser] = useState(true);
	const [userObject, setUserObject] = useState({});

	useEffect(() => {
		connection();
		const removeListener = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const currentUid = user.uid;
				userRequests.getUserByUid(currentUid).then((user) => {
					setUserObject(user);
					setAuthed(true);
					setCurrentUid(currentUid);
					setPendingUser(false);
				});
			} else {
				setPendingUser(false);
			}
		});

		return () => removeListener();
	}, []);

	const logoutClickEvent = () => {
		authRequests.logoutUser();
		this.setState({ authed: false });
	};

	const isServiceProvider = userObject.isServiceProvider;

	if (pendingUser) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<>
			{isServiceProvider ? (
				<ServicerView
					authed={authed}
					isServiceProvider={isServiceProvider}
					logoutClickEvent={logoutClickEvent}
					ServiceProviderHome={ServiceProviderHome}
					ServiceAppList={ServiceAppList}
					Messages={Messages}
				/>
			) : (
				<CustomerView
					authed={authed}
					logoutClickEvent={logoutClickEvent}
					UserHome={UserHome}
					NewAppointmentForm={NewAppointmentForm}
					PickDate={PickDate}
					Appointments={Appointments}
					NewMemberForm={NewMemberForm}
					Messages={Messages}
				/>
			)}
		</>
	);
};

export default App;
