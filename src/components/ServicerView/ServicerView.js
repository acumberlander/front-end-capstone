import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from '../Pages/Auth/Auth';
import MyNavbar from '../MyNavbar/MyNavbar';

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

const ServicerView = ({
	authed,
	isServiceProvider,
	logoutClickEvent,
	ServiceProviderHome,
	ServiceAppList,
	Messages,
}) => {
	return (
		<div className="App">
			<BrowserRouter>
				<React.Fragment>
					<MyNavbar
						isAuthed={authed}
						isServiceProvider={isServiceProvider}
						logoutClickEvent={logoutClickEvent}
					/>
					<div className="container">
						<div className="d-flex justify-content-center">
							<Switch>
								<PrivateRoute
									path="/"
									exact
									component={ServiceProviderHome}
									authed={authed}
								/>
								<PrivateRoute
									path="/serviceproviderhome"
									component={ServiceProviderHome}
									authed={authed}
								/>
								<PrivateRoute
									path="/serviceapplist"
									component={ServiceAppList}
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
					</div>
				</React.Fragment>
			</BrowserRouter>
		</div>
	);
};

export default ServicerView;
