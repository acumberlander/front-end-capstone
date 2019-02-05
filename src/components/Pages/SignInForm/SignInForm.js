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
      <div className='col'>
      <form>
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
        <Button
        type="submit"
        className="btn btn-primary"
        autoComplete="current-password"
        onClick={this.login}>
        Log In
        </Button>
      </form>
      <br></br>
        <Button
        className="btn btn-primary"
        autoComplete="current-password"
        tag={RRNavLink}
        to="/newmemberform">
        Sign Up
        </Button>
    </div>
    );
  }
}



export default SignInForm;