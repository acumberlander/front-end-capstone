import React from 'react';
// import PropTypes from 'prop-types';


const defaultAppointment = {
  firstName: '',
  lastName: '',
  date: '',
  time: '',
  status: 'is pending',
  address: '',
  city: '',
  state: '',
  acres: '',
  uid: '',
  price: '0',
};

class PickDate extends React.Component {
  state = {
    newAppointment: defaultAppointment
  }

  static propTypes = {

  }

  render() {
    const { newAppointment } = this.state;
    return (
      <div className="dateWeatherContainer container-fluid p-0">
        <div class="col-9"></div>
        <div id="dateColumn" class="col-3 p-0">
          <div className="dateHeader">
            <h1>Pick a Date</h1>
            <hr id="pickDateLine"></hr>
          </div>
          <div id="dateDiv">
            <input
              id="date"
              type="date"
              placeholder="mm/dd/yyyy"
              className="form-control"
              value={newAppointment.date}
              onChange={this.dateChange}
            />
            <hr id="dateLine"></hr>
          </div>
          <div id="timeDiv">
          <input
              id="time"
              type="time"
              placeholder="12:00"
              className="form-control"
              value={newAppointment.time}
              onChange={this.timeChange}
            />
            <hr id="timeLine"></hr>
          </div>
          <div className="nextButtonDiv">
            <button
              onClick={this.formSubmit}
              className="makeAppoinment">
              Set Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PickDate