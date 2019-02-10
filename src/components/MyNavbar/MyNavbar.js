import React from 'react';
import './MyNavbar.scss';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import authRequests from '../../Helpers/Data/authRequests';


class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // currentUid = authRequests.getCurrentUid();

  render() {
    // same as const isAuthed = this.props.isAuthed
    // same as const newThing = this.props.isAuthed
    // const bossMan = 'xJWSDIxu3Qa6OnUjmoax7q4CXni2';
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
    //   if (this.currentUid === bossMan) {
    //     return (
    //       <Nav className="ml-auto" navbar>
    //         <NavItem>
    //           <NavLink tag={RRNavLink} to="/serviceapplist"><i class="fas fa-2x fa-calendar-alt"></i></NavLink>
    //         </NavItem>
    //         <NavItem>
    //           <NavLink tag={RRNavLink} to="/messages"><i class="fas fa-2x fa-comments"></i></NavLink>
    //         </NavItem>
    //         <NavItem className="logoutLink">
    //           <NavLink onClick={logoutClickEvent}>logout</NavLink>
    //         </NavItem>
    //       </Nav>
    //     );
    // } else 
    if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem className="newAppointment">
              <NavLink tag={RRNavLink} to="/newappointmentform"><i class="fas fa-2x fa-calendar-plus"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/appointments"><i class="fas fa-2x fa-calendar-alt"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/messages"><i class="fas fa-2x fa-comments"></i></NavLink>
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
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">LawnService</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
