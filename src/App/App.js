import React, { Component } from 'react';
import 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import connection from '../Helpers/Data/connection';

import Auth from '../components/Pages/Auth/Auth';
import Home from '../components/Home/Home';
import Appointments from '../components/Pages/Appointments/Appointments';
import NewAppointmentForm from '../components/Pages/NewAppointmentForm/NewAppointmentForm';
import NewMemberForm from '../components/Pages/NewMemberForm/NewMemberForm';
import Messages from '../components/Pages/Messages/Messages';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import authRequests from '../Helpers/Data/authRequests';
import ServiceAppList from '../components/Pages/ServiceAppList/ServiceAppList';
import './App.scss';
import userRequests from '../Helpers/Data/Requests/userRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends Component {
  state = {
    authed: false,
    currentUid: '',
    pendingUser: true,
    userObject: {}
    // isServiceProvider: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      // const bossMan = 'xJWSDIxu3Qa6OnUjmoax7q4CXni2';
      // userRequests.getUserByUid(bossMan)
      //   .then((user) => {
      //     this.setState({ userObject: user });
      //     // console.log(this.state)
      //     console.log(this.state.userObject);
      //   });
      if (user) {
        const currentUid = user.uid;
        console.log(currentUid);
        userRequests.getUserByUid(currentUid)
        .then((user) => {
          this.setState({ userObject: user,
          // console.log(this.state)
          // console.log(this.state.userObject);
          authed: true,
          currentUid,
          pendingUser: false,
        });
                  console.log(this.state.userObject);
      });
      } else {
        this.setState({
          authed: false,
          currentUid: '',
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }
//  getBoss = () => {
//   const bossMan = 'xJWSDIxu3Qa6OnUjmoax7q4CXni2';
//   userRequests.getUserByUid(bossMan)
//     .then((user) => {
//       this.setState({ userObject: user });
//       // console.log(this.state)
//       // console.log(this.state.userObject);
//     });
//   }

  render() {
      // console.log(this.state);

    // this.setState({})
    const {
      authed,
      userObject,
      pendingUser,
    } = this.state;
    
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };
    const isServiceProvider = userObject.isServiceProvider
    if (pendingUser) {
      return null;
    } else if (isServiceProvider) {
      console.log(this.state && "hello");
      return(
        <div className="App">
          <BrowserRouter>
            <React.Fragment>
              <MyNavbar isAuthed={authed} isServiceProvider={isServiceProvider} logoutClickEvent={logoutClickEvent} />
              <div className="container">
                <div className="d-flex justify-content-center">
                  <Switch>
                    <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                    <PrivateRoute path='/serviceapplist' component={ServiceAppList} authed={this.state.authed} />
                    <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                    <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          </BrowserRouter>
        </div>
      )
    } else {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
              <div className="container">
                <div className="d-flex justify-content-center">
                  <Switch>
                    <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                    <PrivateRoute path='/newappointmentform' component={NewAppointmentForm} authed={this.state.authed} />
                    <PrivateRoute path='/appointments' component={Appointments} authed={this.state.authed} />
                    <PublicRoute path='/newmemberform' component={NewMemberForm} authed={this.state.authed} />
                    <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                    <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
