import React from 'react';
import './UserHome.scss';

class UserHome extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
    <div className='Home mx-auto'>
      <div className="homeLinksContainer">
        <div className="newAppointment">
          <img className="newAppointmentPic"
               id="newappointmentform"
               onClick={this.changeView}
               src={require("../../img/cuttingGrass.jpeg")}
               alt="New Appointment"></img>
        </div>
        <div   className="appointments">
          <img className="appointmentsPic"
               id="appointments"
               onClick={this.changeView}
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
