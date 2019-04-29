import React from 'react';
import './NewMemberForm.scss';
import userRequests from '../../../Helpers/Data/Requests/userRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import firebase from 'firebase/app';


const userInfo = {
  email: '',
  password: '',
  confirmPassword: '',
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

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempInfo = { ...this.state.newUserInfo };
    tempInfo[name] = e.target.value;
    this.setState({ newUserInfo: tempInfo});
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

  confirmPasswordChange = (e) => {
    this.formFieldStringState('confirmPassword', e);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const signUp = this.signUp;
    const userInfo = { ...this.state.newUserInfo };
    if (userInfo.password === userInfo.confirmPassword)
    {
      signUp(this.state.newUserInfo);
      this.setState({ newUserInfo:userInfo })
    } else {
      alert("Passwords don't match. Try again.");
    }
  }

  render () {
    return (
      <div className='NewMemberContainer'>
        <div id="newMemberHeaderDiv">
          <h1 id="newMemberHeader">New Member</h1>
        </div>
        <div className="newMemberCard">
          <div className="">
          <form>
            <div className="loginInputDiv">
            <div className="form-group">
              <input
              type="text"
              name='firstName'
              value={this.firstName}
              className="form-control"
              onChange={this.firstNameChange}
              id="newFirstName"
              placeholder="First Name"
              />
              <hr class="fieldLine"></hr>
            </div>
            <div className="form-group">
              <input
              type="text"
              name='lastName'
              value={this.lastName}
              className="form-control"
              onChange={this.lastNameChange}
              id="newLastName"
              placeholder="Last Name"
              />
              <hr class="fieldLine"></hr>
            </div>
            <div className="form-group">
              <input
              type="email"
              name='email'
              value={this.email}
              className="form-control"
              onChange={this.emailChange}
              id="newUsername"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              />
              <hr class="fieldLine"></hr>
            </div>
            <div className="form-group">
              <input
              type="password"
              name='password'
              value={this.password}
              className="form-control"
              onChange={this.passwordChange}
              id="newPassword"
              placeholder="Password"
              />
              <hr class="fieldLine"></hr>
            </div>
            <div className="form-group">
              <input
              type="password"
              name='confirmPassword'
              value={this.confirmPassword}
              className="form-control"
              onChange={this.confirmPasswordChange}
              id="confirmNewPassword"
              placeholder="Confirm Password"
              />
              <hr class="fieldLine"></hr>
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