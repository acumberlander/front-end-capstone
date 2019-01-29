import React from 'react';
import { Button } from 'reactstrap';
// import authRequests from '../../../Helpers/Data/authRequests';
import './Auth.scss';
import 'firebase/auth';
import firebase from 'firebase/app';

class Auth extends React.Component {
  authenticateUser = (e, email, password) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error with auth', err));

  }

  signUp = (e, email, password) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error with auth', err));
  }

  render() {
    return (
      <div className="AuthContainer">
        <div className="loginCard">
          <div className="loginHeader">
          Login
            </div>
            <div className="">
            <div className="loginInputs">
              <input id="username" className="m-3" placeholder="email/username"></input>
              <input id="password" className="m-3" placeholder="password"></input>
            </div>
            <div>
              <Button className="loginButton btn btn-success" onClick={this.authenticateUser}>
                Login
              </Button>
            </div>
              <div className="or">
              or
              </div>
            <div>
              <Button className="createButton btn btn-success" onClick={this.authenticateUser}>
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
