import React from 'react';
import './NewAppointmentForm.scss';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import messageRequests from '../../../Helpers/Data/Requests/messageRequests';
import weatherRequest from '../../../Helpers/Data/Requests/weatherRequest';
import StateList from '../../../Helpers/Data/StateList';
import CityList from '../../../Helpers/Data/usaCities';
// import Select from 'react-select';


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

const defaultComment = {
  uid: '',
  message: '',
  timestamp: 0,
};

class NewAppointmentForm extends React.Component {
  state = {
    newAppointment: defaultAppointment,
    newComment: defaultComment,
  }

  // Sets the state to whatever string input is passed
  formFieldStringState = (name, e) => {
    e.preventDefault();
    e.persist();
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value;
    this.setState({ newAppointment: tempAppointment });
  }

  // Sets the state to whatever integer input is passed
  formFieldNumberState = (name, e) => {
    e.preventDefault();
    e.persist();
    const myPrice = e.target.value*50;
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value*1;
    tempAppointment.price = myPrice;
    this.setState({ newAppointment: tempAppointment });
  }

  // All of these 'change' functions pass in the name of a value that's in the newAppointment object
  // It also passes in an event(e) parameter that will trigger the formFieldStringState function
  //-----------------------------------------------------------------------------------//
  appointmentChange = e => this.formFieldStringState('appointment', e);

  dateChange = e => this.formFieldStringState('date', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  acresChange = e => this.formFieldNumberState('acres', e);
//-----------------------------------------------------------------------//

  // Sets the state for newComment to whatever string input is passed
  inputFieldStringState = (name, e) => {
    e.preventDefault();
    e.stopPropagation();
    const uid = authRequests.getCurrentUid();
    const tempComment = { ...this.state.newComment };
    tempComment[name] = e.target.value;
    tempComment.uid = uid;
    this.setState({ newComment: tempComment });
  }

  // Passes in the name of a value that's in the newAppointment object
  // It also passes in an event(e) parameter that will trigger the inputFieldStringState function
  commentChange = e => this.inputFieldStringState('message', e);

  // posts appointment to firebase, pulls it back down and sets it to state
  addAppointment = (newAppointment, newComment) => {
    const uid = authRequests.getCurrentUid();    
    messageRequests.createMessage(newComment);
    appointmentRequests.postRequest(newAppointment)
      .then(() => {
        appointmentRequests.getAllAppsByUid(uid)
          .then((appointments) => {
            this.setState({ appointments });
            this.props.history.push(`/appointments`);
          });
      })
    .catch(err => console.error('error with appointments post', err));
  }

  // gets weather info based on date and posts to firebase
  postToFirebase = (appointmentDate) => {
    let city_par = this.state.newAppointment.city;
    let state_par = this.state.newAppointment.state;
    weatherRequest.getForecast(city_par, state_par)
    .then((forecast16) => {
      let city = forecast16.city_name;
      let state = forecast16.state_code;
      
      console.log(city);
      console.log(state);

      let dayObject = [];
      for (let i=0; i<forecast16.data.length; i++) {
        if (forecast16.data[i].datetime === appointmentDate) {
          forecast16.data[i].userUid = authRequests.getCurrentUid();
          dayObject.push(forecast16.data[i])
        }
      }
      let weatherCode = dayObject[0].weather.code;
      let weatherCondition = dayObject[0].weather.description;
      
      if(dayObject === []) {
        console.log("No weather data available for that date yet.");
      }

      if (!weatherCode === "c01d" || "c01n" || "c02d" || "c02n" ||
                            "c03d" || "c03n" || "c04d" || "c04n") {
        throw `Sorry, but it's expected to ${weatherCondition} that day.`;
      }
      weatherRequest.postRequest(dayObject[0]);
      }
    )
  }

  // submits appointment to firebase and sets the state of the newly made appointment 
  formSubmit = (e) => {
    e.preventDefault();
    const myAppointment = { ...this.state.newAppointment };
    const myComment = { ...this.state.newComment };
    myAppointment.uid = authRequests.getCurrentUid();
    const firstName = myAppointment.firstName;
    const lastName = myAppointment.lastName;
    const city = myAppointment.city;
    const theState = myAppointment.state;
    const address = myAppointment.address;
    const date = myAppointment.date;
    const acres = myAppointment.acres;
    const fieldArray = [firstName, lastName, city, theState, address, date]
    const today = new Date();
    const alphabet = /^[A-Za-z ']+$/;
    const addressInput = /^[A-Za-z0-9 '.]+$/;

    // blank input validation
    if (fieldArray.includes('')) {
      alert("No customer info can be left blank.")
      return;
    }

    // acre input validation
    if (acres <= 0 || acres === null) {
      alert("Acres must be greater than zero.")
      return;
    }

    // date input validation
    // makes sure date is within 2 weeks
    if (new Date(date) > (today.setDate(today.getDate() + 14))) {
      alert("Appointment must be within 2 weeks.")
      return;
    }

    // date input validation
    // makes sure date is not today or in the past
    else if (new Date(date) < Date.now()) {
      alert("Appointments cannot be set for the past or on the same day.")
      return;
    }

    // city input validation
    if (!CityList.includes(city)) {
      alert(`${city} is not a valid city.`);
      return;
    }

    // state input validation
    if (!StateList.includes(theState)) {
      alert(`${theState} is not a valid state.`);
      return;
    }

    // first name input validation
    if (!firstName.match(alphabet)) {
      alert(`${firstName} isn't valid. You can only use letters.`)
      return;
    }

    // last name input validation
    if (!lastName.match(alphabet)) {
      alert(`${lastName} isn't valid. You can only use letters.`)
      return;
    }

    // address input character validation
    if (!address.match(addressInput)) {
      alert(`Address can only include letters, numbers, and the period symbol(.). Please try again.`)
      return;
    }

    // adds comment/message if there is input.
    // Also pushes appointment to firebase and sets the state
    if (myComment.message === "") {
      this.addAppointment(myAppointment);
      this.setState({ newAppointment: defaultAppointment });
      this.postToFirebase(date);
    } else {
      this.addAppointment(myAppointment, myComment);
      this.setState({ newAppointment: defaultAppointment, newComment: defaultComment });
      this.postToFirebase(date);
    }
  }


  render() {
    const { newAppointment, newComment } = this.state;
    return (
      <div className="newAppointmentContainer container-fluid p-0">
          <div className="newAppointmentForm col-9">
            <form onSubmit={this.formSubmit}>
                <div className="customerInfoHeader m-0">Customer Info</div>
                  <div class="centerCustomerLine">
                    <hr id="customerInfoLine"></hr>
                  </div>
                  <div id="formDiv">
                  <div className="leftColumn col-5 p-0">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      value={newAppointment.firstName}
                      onChange={this.firstNameChange}
                      required
                    />
                    <hr class="fieldLine"></hr>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      value={newAppointment.lastName}
                      onChange={this.lastNameChange}
                      required
                    />
                    <hr class="fieldLine"></hr>
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      value={newAppointment.address}
                      onChange={this.addressChange}
                      required
                    />
                      <hr class="fieldLine"></hr>
                  </div>
                  <div class="rightColumn col-5 p-0">
                    <input 
                      type="text"
                      placeholder="City"
                      className="form-control"
                      value={newAppointment.city}
                      onChange={this.cityChange}
                      required
                    />
                    <hr class="fieldLine"></hr>
                    <input
                      type="text"
                      placeholder="State"
                      className="form-control"
                      value={newAppointment.state}
                      onChange={this.stateChange}
                      required
                      />
                    {/* <Select
                      placeholder="State"
                      options={ StateList }
                      value={newAppointment.state}
                      // onChange={this.stateChange}
                    /> */}
                    <hr class="fieldLine"></hr>
                    <input
                      type="date"
                      id="date"
                      className="form-control"
                      value={newAppointment.date}
                      onChange={this.dateChange}
                      required
                    />
                    <hr class="fieldLine"></hr>
                  </div>
                  </div>
            <div id="commentDiv">
                  <div className="commentHeader"><h3>Leave us a message!</h3></div>
                  <div className="commentBlock">
                  <textarea
                    type="text"
                    className="commentInput"
                    placeholder="Comments/Message"
                    value={newComment.message}
                    onChange={this.commentChange}
                    />
              </div>
            </div>
          </form>
        </div>
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
              value={newAppointment.acres}
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
              className="nextButton">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAppointmentForm;
