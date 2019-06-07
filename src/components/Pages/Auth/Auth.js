import React from 'react';
import SignInForm from '../SignInForm/SignInForm';
import userRequests from '../../../Helpers/Data/Requests/userRequests';
import authRequests from '../../../Helpers/Data/authRequests';
import './Auth.scss';
import 'firebase/auth';
import firebase from 'firebase/app';


class Auth extends React.Component {
 
  authenticateUser = (e, email, password) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then((object) => {
      const bossman = 'xJWSDIxu3Qa6OnUjmoax7q4CXni2';
      if (bossman === object.user.uid) {
        this.props.history.push('/serviceproviderhome');
      } else {
        this.props.history.push('/home');
      }
    }).catch((err) => {
      let errorCode = err.code;
      let errorMessage = err.message;
      if (errorCode === "auth/wrong-password") {
        alert("Username or password is invalid.");
      } else if(errorCode === "auth/user-not-found") {
        alert("Username or password is invalid.")
      }
      alert(errorMessage);
    });
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
    }).catch((err) => {
      alert(err.message);
    });
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
