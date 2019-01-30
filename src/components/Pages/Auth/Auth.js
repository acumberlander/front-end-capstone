import React from 'react';
// import { Button } from 'reactstrap';
import userRequests from '../../../Helpers/Data/Requests/userRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import ProfileForm from '../../ProfileForm/ProfileForm';
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

  // signUp = (newUserInfo) => {
  //   e.preventDefault();
  //   // userRequests.createUser();
  //   firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
  //     this.props.history.push('/home');
  //     console.log(res.user.displayName);
  //   }).catch(err => console.error('there was an error with auth', err));
  // }

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


  render() {
    return (
      <div className="AuthContainer">
      <ProfileForm
        authenticateUser={this.authenticateUser}
        signUp={this.signUp}
      />
        {/* <div className="loginCard">
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
              <Button className="createButton btn btn-success">
                Create Account
              </Button>
            </div>
          </div>
        </div>*/}
      </div> 
    );
  }
}

export default Auth;
