import React from 'react';
import PropTypes from 'prop-types';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';
import './AppointmentItem.scss';
import authRequests from '../../../../Helpers/Data/authRequests';
import moment from 'moment';
import appointmentRequests from '../../../../Helpers/Data/Requests/appointmentRequests';
import Modal from 'react-responsive-modal';
import weatherRequest from '../../../../Helpers/Data/Requests/weatherRequest';
import sunny from '../../../../img/weatherIcons/day.svg';
import cloudy from '../../../../img/weatherIcons/cloudy.svg';
import partlyCloudy from '../../../../img/weatherIcons/cloudy-day-1.svg';


const defaultAppointment = {
  firstName: '',
  lastName: '',
  date: '',
  time: '',
  status: '',
  address: '',
  city: '',
  state: '',
  acres: '',
  uid: '',
};

const defaultWeather = {
  tempHigh: '',
  tempLow: '',
  description: '',
  weatherIcon: ''
};

class AppointmentItem extends React.Component {
  static propTypes = {
    appointment: appointmentShape,
    deleteAppointment: PropTypes.func,
    editAppointment: PropTypes.func,
    passAppointmentToEdit: PropTypes.func,
    formSubmitAppointment: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  state = {
    newAppointment: defaultAppointment,
    open: false,
    weather: defaultWeather,
  }

  // Function that allows user to delete appointment
  deleteAppointment = (e) => {
    e.preventDefault();
    const { deleteAppointment, appointment } = this.props;

    /* This function makes a DELETE request to firebase and then a GET request
       and then sets the state of the appointment data comes back. */
    deleteAppointment(appointment.id);
  }

  // Function that allows user to edit appointment
  editAppointment = (e) => {
    e.preventDefault();
    const { passAppointmentToEdit, appointment } = this.props;

    // Function that sets the state of the EditId to the appointmentId.
    passAppointmentToEdit(appointment.id);

    // Opens the modal
    this.setState({ open: true });
  }

  /* Function that changes the state of appointment data in realtime. 
     However, in order for it to work, the correct data field has to be passed in as parameter.
     An event (e) must also occur. */
  formFieldStringState = (name, e) => {
    e.preventDefault();
    /* Sets variable to the value of each individual value in the appointmentShape object.
       It does this by using the spread operator. ie: '...' */
    const tempAppointment = { ...this.props.appointment };
    tempAppointment[name] = e.target.value;
    this.setState({ newAppointment: tempAppointment });
  }

  /* Each change function below runs the formFieldStringState function and
     passes in the appointment property that's being edited and the event (e)
     that changes the state of each property.  */
  appointmentChange = e => this.formFieldStringState('appointment', e);

  dateChange = e => this.formFieldStringState('date', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  // Function that submits/saves the newly edited appointment and closes the modal
  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myAppointment = { ...this.state.newAppointment };
    myAppointment.uid = authRequests.getCurrentUid();
    onSubmit(myAppointment);
    this.setState({ newAppointment: defaultAppointment, open: false });
  }

  // Lifecycle method that runs when the component updates
  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      // Gets the appointment item from firebase based on the 'editId' that's passed in
      appointmentRequests.getAppointmentItem(editId)
        .then((appointment) => {
          /* Sets the state of the newAppointment with the data that returned 
             so that it will populate when the modal is opened
             and the user wants to make edits. */
          this.setState({ newAppointment: appointment.data });
        })
      .catch(err => console.error('error when getAppointmentItem', err));
    }
  }
  
  // function that closes the edit appointment modal
  onCloseModal = () => {
    this.setState({ open: false });
  };

  /* This function gets the current weather data from an api
     and then sets that data to the weather state. */
  renderWeather = () => {
    const { weather } = this.state;
    const { appointment } = this.props;

    // Api GET request that returns an array of 16 day objects
    weatherRequest.getForecast(appointment.city, appointment.state)
    .then((forecast16) => {
        // Logic to select the day that matches with the appointment date
        for (let i=0; i<forecast16.data.length; i++) {
          let theDay = forecast16.data[i];
          if (theDay.datetime === appointment.date) {

            // Setting the value for each weather property
            let tempHigh = weather.tempHigh = theDay.max_temp;
            let tempLow = weather.tempLow = theDay.min_temp;
            let desc = weather.description = theDay.weather.description;
            let icon = weather.weatherIcon = theDay.weather.icon;

            // Defining an object so that it can be used to set the state of the weather
            let currentWeather = {
              tempHigh: tempHigh,
              tempLow: tempLow,
              description: desc,
              weatherIcon: icon
            }

            // Using 'currentWeather' object to set the state of weather
            this.setState({ weather: currentWeather})
          }
        }
      }
    )
  }

  // Lifecycle method that will run the function within it when this component loads
  componentDidMount() {
    this.renderWeather();
  }

  render() {
    const { open, newAppointment, weather } = this.state;
    const { appointment, isEditing, editId } = this.props;
    const uid = authRequests.getCurrentUid();
    let weatherIcon = '';

    // Weather icon logic
    if (weather.weatherIcon === "c01d" || "c01n") {
      weatherIcon = sunny;
    }
    if(weather.weatherIcon === "c02d" || "c02n") {
      weatherIcon = partlyCloudy;
    } if (weather.weatherIcon === "c03d" || "c03n" || "c04d" || "c04n") {
      weatherIcon = cloudy;
    }

    // Function that renders the edit button on each appointment item
    const makeEditButton = () => {
      if (appointment.uid === uid) {
        return (
          <div id="editButtonDiv">
            <span className="">
              <button className="btn btn-default" onClick={this.editAppointment}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
          </div>
        );
      }
    };

    // Function that renders the delete button on each appointment item
    const makeDeleteButton = () => {
      if (appointment.uid === uid) {
        return (
          <div id="deleteButtonDiv">
            <span className="">
              <button className="btn btn-default" onClick={this.deleteAppointment}>
                <i className="fas fa-times-circle"></i>
              </button>
            </span>
          </div>
        )
      }
    };

    return (
      <div className="appointmentItemContainer">
        <div className="AppointmentItem">
          <div className="appFirstCol col-4">
          <div className="customerInfoContainer">
            <p className="m-0 p-0 custInfoHeader">Customer Info</p>
            <hr className="appBreakLine"></hr>
            <div id="nameLine">{appointment.firstName} {appointment.lastName}</div>
            <div id="addressSection">
              <div id="addressLine">{appointment.address}</div>
              <div id="cityStateLine">{appointment.city}, {appointment.state}</div>
            </div>
          </div>
          <div className="serviceQuoteContainer">
            <p className="serviceHeader m-0">Quote Estimate</p>
            <hr className="appBreakLine"></hr>
            <h2 id="priceTag">${appointment.price}</h2>
          </div>
        </div>
        <div className="appSecondCol col-4">
          <div className="dateContainer">
            <p className="dateHeader m-0">Date</p>
            <hr className="appBreakLine"></hr>
            <div className="dateDiv">{moment(appointment.date).format('MM/DD/YYYY')}</div>
          </div>
        <div className="" id="weatherSoonDiv">
          <div id="weatherIconDiv">
              <img id="weatherIcon" src={weatherIcon} alt="weather icon"></img>
            <div id="weathertext">
              <p>High: {weather.tempHigh}</p>
              <p>Low: {weather.tempLow}</p>
              <p>{weather.description}</p>
            </div>
          </div>
        </div>
        </div>
        <div className="moveEditAndDelete col-1 m-0 p-0">
          <div className="moveDeleteButton">{makeDeleteButton()}</div>
          <div className="moveEditButton">{makeEditButton()}</div>
        </div>
          <Modal
        open={open}
        onClose={this.onCloseModal}
        isEditing={isEditing}
        editId={editId}>
          <div className="formContainer">
          <form className="modalForm">
            <div id="modalInputs">
              <div className="firstModalColumn">
                <div className="form-group">
                  <div className="labelDiv">
                    <label className="" htmlFor="firstName"><h5>First Name</h5></label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    value={newAppointment.firstName}
                    onChange={this.firstNameChange}
                  />
                </div>
                <div className="form-group">
                  <div className="labelDiv">
                    <label className="" htmlFor="lastName"><h5>Last Name</h5></label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    value={newAppointment.lastName}
                    onChange={this.lastNameChange}
                  />
                </div>
                <div className="form-group">
                  <div className="labelDiv">
                    <label className="" htmlFor="date"><h5>Date</h5></label>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    placeholder="Date"
                    value={newAppointment.date}
                    onChange={this.dateChange}
                  />
                </div>
              </div>
              <div className="secondModalColumn">
                <div className="form-group">
                  <div className="labelDiv">
                    <label className="" htmlFor="address"><h5>Address</h5></label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    value={newAppointment.address}
                    onChange={this.addressChange}
                  />
                </div>
                <div className="form-group">
                  <div className="labelDiv">
                    <label className="" htmlFor="city"><h5>City</h5></label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    value={newAppointment.city}
                    onChange={this.cityChange}
                  />
                </div>
                <div className="form-group">
                  <div className="labelDiv">
                    <label className="" htmlFor="state"><h5>State</h5></label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="State"
                    value={newAppointment.state}
                    onChange={this.stateChange}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="saveEventButton">
            <button className="btn btn-danger" onClick={this.formSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
        </div>
      </div>
    );
  }
}

export default AppointmentItem;
