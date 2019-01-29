import React from 'react';
import './ProfileForm.scss';

class ProfileForm extends React.Component {
  state = {
    email: '',
    password: ''
}
  login = (e) => {
    e.preventDefault();
    this.props.authenticateUser(e, this.state.email, this.state.password);
  }
  createAccount = (e) => {
    e.preventDefault();
    this.props.signUp(e, this.state.email, this.state.password)
  }
 
  change = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  render () {
    return (
      <div className='col'>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" name='email' value={this.email} className="form-control" onChange={this.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name='password' value={this.password} className="form-control" onChange={this.change} id="exampleInputPassword1" placeholder="Password"></input>
        </div>
        <button type="submit" className="btn btn-primary" autoComplete="current-password" onClick={this.login}>Log In</button>
        <button type="submit" className="btn btn-primary" autoComplete="current-password" onClick={this.createAccount}>Sign Up</button>

      </form>
    </div>
    );
  }
}



export default ProfileForm;