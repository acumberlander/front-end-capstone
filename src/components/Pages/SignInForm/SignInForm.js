import React from 'react';
import './SignInForm.scss';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

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

  render () {
    return (
      <div className="AuthContainer">
        <div className='loginCard'>
        <div className="loginHeader">
          Login
        </div>
        <div className="">
        <form>
        <div className="loginInputs">
          <div className="form-group">
            <input
            type="email"
            name='email'
            value={this.email}
            className="form-control m-2"
            onChange={this.emailChange}
            id="username"
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
            id="password"
            placeholder="Password"></input>
          </div>
        </div>
        <div>
          <Button
          type="submit"
          className="btn btn-primary loginButton"
          autoComplete="current-password"
          onClick={this.login}>
          Login
          </Button>
        </div>
        </form>
        <div className="or">or</div>
          <Button
          className="btn btn-primary createButton"
          autoComplete="current-password"
          tag={RRNavLink}
          to="/newmemberform">
          Sign Up
          </Button>
          </div>
        </div>
      </div>
    );
  }
}



export default SignInForm;