import React, { useState } from 'react';
import './MyNavbar.scss';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

const MyNavbar = ({ isAuthed, logoutClickEvent, isServiceProvider }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	let linkLocation = '/';

	if (isServiceProvider) {
		linkLocation = '/serviceproviderhome';
	}
	const buildNavbar = () => {
		if (isAuthed && isServiceProvider) {
			return (
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink tag={RRNavLink} to="/serviceapplist">
							<i className="fas fa-2x fa-calendar-alt" />
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={RRNavLink} to="/messages">
							<i className="fas fa-2x fa-comments" />
						</NavLink>
					</NavItem>
					<NavItem className="logoutLink">
						<NavLink onClick={logoutClickEvent}>logout</NavLink>
					</NavItem>
				</Nav>
			);
		} else if (isAuthed) {
			return (
				<Nav className="ml-auto" navbar>
					<NavItem className="newAppointment">
						<NavLink tag={RRNavLink} to="/newappointmentform">
							<i className="fas fa-2x fa-calendar-plus" />
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={RRNavLink} to="/appointments">
							<i className="fas fa-2x fa-calendar-alt" />
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={RRNavLink} to="/messages">
							<i className="fas fa-2x fa-comments" />
						</NavLink>
					</NavItem>
					<NavItem className="logoutLink">
						<NavLink onClick={logoutClickEvent}>logout</NavLink>
					</NavItem>
				</Nav>
			);
		} else {
			return <Nav className="ml-auto" navbar />;
		}
	};

	return (
		<div className="my-navbar">
			<Navbar dark expand="md">
				<div className="navLogo">
					<a href={linkLocation}>Grass Kisser</a>
				</div>
				<NavbarToggler className="navToggle" onClick={(e) => toggle(e)} />
				<Collapse isOpen={isOpen} navbar>
					{buildNavbar()}
				</Collapse>
			</Navbar>
		</div>
	);
};

export default MyNavbar;
