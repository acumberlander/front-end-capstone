import React from 'react';
import './UserHome.scss';

class UserHome extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    if (view === 'newAppointment') {
      this.props.history.push(`/${'newappointmentform'}`);
    }
  }

  render() {
    return (
    <div className='Home mx-auto'>
      <div className="homeLinksContainer">
          <div id="newAppointmentText">
            <h1>New Appointment</h1>
          </div>
        <div id="newAppointment"
             onClick={this.changeView}>
          <img className="newAppointmentPic"
              id="newappointmentform"
              src={require("../../img/cuttingGrass.jpeg")}
              alt="New Appointment">
          </img>
          <div id="newAppointmentTextDiv"></div>
        </div>
        <div id="appointmentText">
            <h1>Appointments</h1>
          </div>
        <div  className="appointments"
              onClick={this.changeView}>
        <div id="appointmentTextDiv"></div>
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
