import React from 'react';
import './MyNavbar.scss';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

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

  linkLocation = "/";
  render() {
    const { isAuthed, logoutClickEvent, isServiceProvider } = this.props;
    if (isServiceProvider) {
        this.linkLocation= "/serviceproviderhome";
    }
    const buildNavbar = () => {
      if (isAuthed && isServiceProvider) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/serviceapplist"><i class="fas fa-2x fa-calendar-alt"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/messages"><i class="fas fa-2x fa-comments"></i></NavLink>
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
        <Navbar dark expand="md">
          <div class="navLogo">
          <a href={this.linkLocation}>Grass Kisser</a>
          </div>
          <NavbarToggler class="navToggle" onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
