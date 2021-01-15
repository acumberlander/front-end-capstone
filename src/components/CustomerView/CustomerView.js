import React from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Auth from '../Pages/Auth/Auth';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
	const routeChecker = (props) =>
		authed === false ? (
			<Component {...props} />
		) : (
			<Redirect to={{ pathname: '/home', state: { from: props.location } }} />
		);
	return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
	const routeChecker = (props) =>
		authed === true ? (
			<Component {...props} />
		) : (
			<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
		);
	return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const CustomerView = ({
	authed,
	logoutClickEvent,
	UserHome,
	NewAppointmentForm,
	Appointments,
	NewMemberForm,
	Messages,
}) => {
	return (
		<div className="App">
			<BrowserRouter>
				<React.Fragment>
					<MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
					<div className="d-flex justify-content-center">
						<Switch>
							<PrivateRoute
								path="/"
								exact
								component={UserHome}
								authed={authed}
							/>
							<PrivateRoute path="/home" component={UserHome} authed={authed} />
							<PrivateRoute
								path="/newappointmentform"
								component={NewAppointmentForm}
								authed={authed}
							/>
							<PrivateRoute
								path="/appointments"
								component={Appointments}
								authed={authed}
							/>
							<PublicRoute
								path="/newmemberform"
								component={NewMemberForm}
								authed={authed}
							/>
							<PrivateRoute
								path="/messages"
								component={Messages}
								authed={authed}
							/>
							<PublicRoute path="/auth" component={Auth} authed={authed} />
						</Switch>
					</div>
				</React.Fragment>
			</BrowserRouter>
			<MyFooter />
		</div>
	);
};

export default CustomerView;
