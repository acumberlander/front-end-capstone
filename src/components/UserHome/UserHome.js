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
      <div className="homeLinkCard card shadow-pop-br">
      <div className="newAppointment grow">
        <div id="newappointmentform" onClick={this.changeView}>
          <i class="fas fa-5x fa-calendar-plus"></i>
          <div className="m-2">
            <h2>Add New Appointment</h2>
          </div>
        </div>
      </div>
      </div>
      <div className="homeLinkCard card shadow-pop-br">
      <div className="appointments grow">
        <div id="appointments" onClick={this.changeView}>
        <i class="fas fa-5x fa-calendar-alt"></i>
        <div className="m-2">
          <h2>Appointment</h2>
        </div>
        </div>
      </div>
      </div>
      <div className="homeLinkCard card shadow-pop-br">
      <div className="messages grow">
        <div id="messages" onClick={this.changeView}>
          <i class="fas fa-5x fa-comments"></i>
          <div className="m-2">
            <h2>Messages</h2>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
    );
  }
}

export default UserHome;
