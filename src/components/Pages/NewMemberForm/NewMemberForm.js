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

  createAccount = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.newUserInfo)
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

  formSubmit = (e) => {
    e.preventDefault();
    const { signUp } = this.props;
    const userInfo = { ...this.state.newUserInfo };
    signUp(this.state.newUserInfo);
    this.setState({ newUserInfo:userInfo })
  }

  render () {
    return (
      <div className='col'>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
          type="text"
          name='firstName'
          value={this.firstName}
          className="form-control"
          onChange={this.firstNameChange}
          id="inputFirstName"
          placeholder="First Name"></input>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
          type="text"
          name='lastName'
          value={this.lastName}
          className="form-control"
          onChange={this.lastNameChange}
          id="inputFirstName"
          placeholder="First Name"></input>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
          type="email"
          name='email'
          value={this.email}
          className="form-control"
          onChange={this.emailChange}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
          type="password"
          name='password'
          value={this.password}
          className="form-control"
          onChange={this.passwordChange}
          id="exampleInputPassword1"
          placeholder="Password"></input>
        </div>
        <button
        type="submit"
        className="btn btn-primary"
        autoComplete="current-password"
        onClick={this.formSubmit}>
        Create Account!
        </button>
      </form>
    </div>
    );
  }
}



export default NewMemberForm;