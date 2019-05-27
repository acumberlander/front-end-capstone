import React from 'react';
import './UserHome.scss';

class UserHome extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.className;
    if (view === 'newAppointment') 
    {
      this.props.history.push('/newappointmentform');
    }
    else if (view === 'appointments')
    {
      this.props.history.push('/appointments');
    }
  }

  render() {
    return (
    <div className='Home mx-auto'>
      <div className="homeLinksContainer">
        <div className="newAppointment" onClick={this.changeView}>
          <div id="newAppointmentText">New Appointment</div>
          <div id="newAppointmentsShade"></div>
          <img className="newAppointmentPic"
            id="newappointmentform"
            src={require("../../img/cuttingGrass.jpeg")}
            alt="New Appointment">
          </img>
        </div>
        <div   className="appointments" onClick={this.changeView}>
          <div id="appointmentText">Appointments</div>
          <div id="appointmentsShade"></div>
          <img className="appointmentsPic"
               id="appointments"
               src={require("../../img/manicuredGrass.jpeg")}
               alt="New Appointment">
          </img>
        </div>
      </div>
    </div>
    );
  }
}

export default UserHome;