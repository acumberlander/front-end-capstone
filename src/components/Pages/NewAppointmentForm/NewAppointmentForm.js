import React from 'react';
import './NewAppointmentForm.scss';
import appointmentRequests from '../../../Helpers/Data/Requests/appointmentRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import messageRequests from '../../../Helpers/Data/Requests/messageRequests';
import weatherRequest from '../../../Helpers/Data/Requests/weatherRequest';
import StateList from './StateList/StateList';
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

  formFieldStringState = (name, e) => {
    e.preventDefault();
    e.persist();
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value;
    this.setState({ newAppointment: tempAppointment });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    e.persist()
    const myPrice = e.target.value*50;
    const tempAppointment = { ...this.state.newAppointment };
    tempAppointment[name] = e.target.value*1;
    tempAppointment.price = myPrice;
    this.setState({ newAppointment: tempAppointment });
  }

  appointmentChange = e => this.formFieldStringState('appointment', e);

  dateChange = e => this.formFieldStringState('date', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  acresChange = e => this.formFieldNumberState('acres', e);

  inputFieldStringState = (name, e) => {
    e.preventDefault();
    e.stopPropagation();
    const uid = authRequests.getCurrentUid();    
    const tempComment = { ...this.state.newComment };
    tempComment[name] = e.target.value;
    tempComment.uid = uid;
    this.setState({ newComment: tempComment });
  }

  commentChange = e => this.inputFieldStringState('message', e);

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

  postToFirebase = (appointmentDate) => {
    weatherRequest.getForecast( "Nashville", "Indiana" )
      .then((forecast16) => {
        const dayObject = [];
        for (let i=0; i<forecast16.length; i++) {
          if (forecast16[i].datetime === appointmentDate) {
            forecast16[i].id = Object.id;
            dayObject.push(forecast16[i])
          }
        }
        if(dayObject === []) {
          console.log("No weather data available for that date yet.");
        }
        weatherRequest.postRequest(dayObject[0])
      })
  }

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
    var today = new Date();

    // const alphabet = "acdefghijklmnopqrstuvwxyz".split('');

    this.postToFirebase(date);

    if (fieldArray.includes('')) {
      alert("No customer info can be left blank.")
      return;
    }

    if (acres <= 0 || acres === null) {
      alert("Acres must be greater than zero.")
      return;
    }

    // if (new Date(date) > today.getDate() + 15) {
    //   alert("Appointment must be within 2 weeks.")
    //   return;
    // }



    // else if (new Date(date) < today.getDate()) {
    //   alert("Appointments cannot be in the past, silly.")
    //   return;
    // }

    if (!StateList.includes(theState)) {
      alert(`${theState} is not a valid state.`);
      return;
    }

//     var firstNameArray = firstName.split('');
//     const nameValidator = () => {
//     var int = 0;
//     firstNameArray.forEach((letter) => {
//       if (!alphabet.includes(letter)) {
//         int ++;
//         alert(`${firstName} is not a valid first name`);
//       }
//     })
//     if (int > 0) {
//       return;
//     }
// }
//     nameValidator();



    if (myComment.message === "") {
      this.addAppointment(myAppointment);
      this.setState({ newAppointment: defaultAppointment });
    } else {
      this.addAppointment(myAppointment, myComment);
      this.setState({ newAppointment: defaultAppointment, newComment: defaultComment });
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
