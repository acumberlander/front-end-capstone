import React from 'react';
// import { Button } from 'reactstrap';
import SignInForm from '../SignInForm/SignInForm';
// import NewMemberForm from '../NewMemberForm/NewMemberForm';
import userRequests from '../../../Helpers/Data/Requests/userRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import './Auth.scss';
import 'firebase/auth';
import firebase from 'firebase/app';

class Auth extends React.Component {
  authenticateUser = (e, email, password) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error with auth', err));
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

  render() {
    return (
      <div className="AuthContainer">
        <SignInForm
          authenticateUser={this.authenticateUser}
        />
      </div> 
    );
  }
}

export default Auth;
