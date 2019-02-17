import React from 'react';
import './Home.scss';

class Home extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
    <div className='Home mx-auto'>
    <div className="homeLinksContainer">
      <div className="homeLinkCard card shadow-pop-br">
      <div className="newAppointment">
        <div id="newappointmentform" onClick={this.changeView}>
          <i class="fas fa-5x fa-calendar-plus"></i>
        </div>
      </div>
      </div>
      <div className="homeLinkCard card shadow-pop-br">
      <div className="appointments">
        <div id="appointments" onClick={this.changeView}>
        <i class="fas fa-5x fa-calendar-alt"></i>
        </div>
      </div>
      </div>
      <div className="homeLinkCard card shadow-pop-br">
      <div className="messages">
        <div id="messages" onClick={this.changeView}>
          <i class="fas fa-5x fa-comments"></i>
        </div>
      </div>
      </div>
    </div>
    </div>
    );
  }
}

export default Home;
