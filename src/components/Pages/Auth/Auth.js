import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../Helpers/Data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <Button className="loginButton btn btn-outline-danger" onClick={this.authenticateUser}>
          <img src="https://www.htps.us/UserFiles/Servers/Server_791028/Templates/login-google.png" alt="google login"></img>
        </Button>
      </div>
    );
  }
}

export default Auth;
