import React from 'react';
import './SignInForm.scss';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import authRequests from '../../../Helpers/Data/authRequests';
import {Link} from 'react-router-dom';

const userInfo = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  uid: '',
  isServiceProvider: false,
};

class SignInForm extends React.Component {
  state = {
   loginInfo: userInfo,
}

  login = (e) => {
    e.preventDefault();
    this.props.authenticateUser(e, this.state.loginInfo.email, this.state.loginInfo.password);
  }
 
  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempInfo = { ...this.state.loginInfo };
    tempInfo[name] = e.target.value;
    this.setState({ loginInfo: tempInfo});
  }

  emailChange = (e) => {
    this.formFieldStringState('email', e);
  }

  passwordChange = (e) => {
    this.formFieldStringState('password', e);
  }

  
  checkServiceProvider = () => {
    const bossMan = 'xJWSDIxu3Qa6OnUjmoax7q4CXni2';  
    const currentUid = authRequests.getCurrentUid();
    if (currentUid === bossMan) {
      this.setState({ isServiceProvider: true });
    }
  }

  render () {
    return (
      <div className="AuthContainer">
        <div className='loginCard'>
        <div className="loginHeader">
          Login
        </div>
        <div>
          <hr id="loginHr"></hr>
        </div>
        <div className="">
        <form>
          <div className="form-group d-flex justify-content-center">
            <input
            type="email"
            name='email'
            value={this.email}
            className="form-control"
            onChange={this.emailChange}
            id="username"
            aria-describedby="emailHelp"
            placeholder="username/email"></input>
          </div>
          <div>
            <hr id="usernameHr"></hr>
          </div>
          <div className="form-group d-flex justify-content-center">
            <input
            type="password"
            name='password'
            value={this.password}
            className="form-control"
            onChange={this.passwordChange}
            id="password"
            placeholder="Password"></input>
          </div>
            <hr id="passwordHr"></hr>
        <div>
          <Button
          type="submit"
          className="btn btn-primary loginButton"
          autoComplete="current-password"
          onClick={this.checkServiceProvider && this.login}>
          Login
          </Button>
        </div>
        </form>
        <div>
          <p class="signupText">If you're new, sign up now!</p>
          <Link
          className="signInLink"
          autoComplete="current-password"
          tag={RRNavLink}
          to="/newmemberform">
          Sign Up
          </Link>
          </div>
          </div>
        </div>
      </div>
    );
  }
}



export default SignInForm;