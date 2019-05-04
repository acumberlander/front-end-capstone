import React from 'react'
import deafultAppointment from '../NewAppointmentForm/NewAppointmentForm';


class PickDate extends React.Component {
  state = {
    newAppointment: deafultAppointment
  }

  render() {
    const { newAppointment } = this.state;
    return (
      <div className="newAppointmentContainer container-fluid p-0">
        <div class="col-9"></div>
        <div id="quoteColumn" class="col-3 p-0">
          <div className="quoteHeader">
            <h1>Get Quote</h1>
            <hr id="getQuoteLine"></hr>
          </div>
          <div id="acreInputDiv">
            <input
              id="acreInput"
              type="number"
              placeholder="Acres"
              className="form-control"
              value={newAppointment.deafultAppointment}
              onChange={this.acresChange}
            />
            <hr id="acreInputLine"></hr>
          </div>
          <div id="theQuoteDiv">
            <h1>${newAppointment.price}</h1>
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