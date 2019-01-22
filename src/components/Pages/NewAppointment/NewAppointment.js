import React from 'react';
import './NewAppointment.scss';

class NewAppointment extends React.Component {
  render() {
    return (
      <div className="newAppointmentContainer mt-5">
        <div className="newAppointmentForm">
          <div className="newAppointmentHeader">Appointment Details</div>
            <div className="topRow">
              <input type="text" placeholder="First Name"/>
              <input type="text" placeholder="Address"/>
              <input type="text" placeholder="Zip Code"/>
            </div>
            <div className="midRow">
              <input type="text" placeholder="Last Name"/>
              <input type="text" placeholder="City"/>
              <h3>Get Instant Quote!</h3>
            </div>
            <div className="bottomRow">
              <input type="text" placeholder="Date"/>
              <input type="text" placeholder="State"/>
              <input type="text" placeholder="Acres"/>
            </div>
            <div className="commentHeader"><h3>Leave us a message!</h3></div>
            <div className="commentAndPrice">
            <textarea className="commentInput" placeholder="Comments/Message" />
            <div className="">
              <h1>$65</h1>
            </div>
            <div className="">
            <p>is your quote</p>
            </div>
            </div>
            <div className="makeAppointment">
            <button className="btn btn-success">
              Make Appointment
            </button>
            </div>
        </div>
      </div>
    );
  }
}

export default NewAppointment;
