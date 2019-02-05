import React from 'react';
import './NewMemberForm.scss';
import userRequests from '../../../Helpers/Data/Requests/userRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import firebase from 'firebase/app';

const userInfo = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  uid: '',
  isServiceProvider: false,
};

class NewMemberForm extends React.Component {
  state = {
   newUserInfo: userInfo,
}

signUp = ( newUserInfo) => {
  firebase.auth().createUserWithEmailAndPassword(newUserInfo.email, newUserInfo.password).then((res) => {
    console.log(res);
    newUserInfo.uid = authRequests.getCurrentUid();
    const usrInfo = { firstName: newUserInfo.firstName,
                      lastName: newUserInfo.lastName,
                      email: newUserInfo.email,
                      uid: newUserInfo.uid,
                      isServiceProvider: false,
                      }
    userRequests.createUser(usrInfo);
    this.props.history.push('/home');
  }).catch(err => console.error('there was an error with auth', err));
}

  // createAccount = (e) => {
  //   e.preventDefault();
  //   this.props.signUp(this.state.newUserInfo)
  // }
 
  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempInfo = { ...this.state.newUserInfo };
    tempInfo[name] = e.target.value;
    this.setState({ newUserInfo: tempInfo});
    console.log("formField function working")
  }

  firstNameChange = (e) => {
    this.formFieldStringState('firstName', e);
  }

  lastNameChange = (e) => {
    this.formFieldStringState('lastName', e);
  }

  emailChange = (e) => {
    this.formFieldStringState('email', e);
  }

  passwordChange = (e) => {
    this.formFieldStringState('password', e);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const signUp = this.signUp;
    const userInfo = { ...this.state.newUserInfo };
    console.log(this.state.newUserInfo);
    signUp(this.state.newUserInfo);
    this.setState({ newUserInfo:userInfo })
  }

  render () {
    return (
      <div className='NewMemberContainer'>
        <div className="newMemberCard">
          <div className="newMemberHeader">
            New Member
          </div>
          <div className="">
          <form>
            <div className="loginInputs">
            <div className="form-group">
              <input
              type="text"
              name='firstName'
              value={this.firstName}
              className="form-control m-2"
              onChange={this.firstNameChange}
              id="newFirstName"
              placeholder="First Name"></input>
            </div>
            <div className="form-group">
              <input
              type="text"
              name='lastName'
              value={this.lastName}
              className="form-control m-2"
              onChange={this.lastNameChange}
              id="newLastName"
              placeholder="Last Name"></input>
            </div>
            <div className="form-group">
              <input
              type="email"
              name='email'
              value={this.email}
              className="form-control m-2"
              onChange={this.emailChange}
              id="newUsername"
              aria-describedby="emailHelp"
              placeholder="Enter email"></input>
            </div>
            <div className="form-group">
              <input
              type="password"
              name='password'
              value={this.password}
              className="form-control m-2"
              onChange={this.passwordChange}
              id="newPassword"
              placeholder="Password"></input>
            </div>
            </div>
            <button
            type="submit"
            className="btn btn-primary createAccount"
            onClick={this.formSubmit}>
            Create Account!
            </button>
          </form>
        </div>
      </div>
    </div>
    );
  }
}



export default NewMemberForm;