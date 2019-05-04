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
import UserHome from '../components/UserHome/UserHome';
import Appointments from '../components/Pages/Appointments/Appointments';
import NewAppointmentForm from '../components/Pages/NewAppointmentForm/NewAppointmentForm';
import PickDate from '../components/Pages/PickDate/PickDate';
import NewMemberForm from '../components/Pages/NewMemberForm/NewMemberForm';
import Messages from '../components/Pages/Messages/Messages';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyFooter from '../components/MyFooter/MyFooter';
import authRequests from '../Helpers/Data/authRequests';
import ServiceAppList from '../components/Pages/ServiceAppList/ServiceAppList';
import './App.scss';
import userRequests from '../Helpers/Data/Requests/userRequests';
import ServiceProviderHome from '../components/Pages/ServiceProviderHome/ServiceProviderHome';

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
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUid = user.uid;
        userRequests.getUserByUid(currentUid)
        .then((user) => {
          this.setState({ userObject: user,
          authed: true,
          currentUid,
          pendingUser: false,
        });
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

  render() {
    
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
      return(
        <div className="App">
          <BrowserRouter>
            <React.Fragment>
              <MyNavbar isAuthed={authed} isServiceProvider={isServiceProvider} logoutClickEvent={logoutClickEvent} />
              <div className="container">
                <div className="d-flex justify-content-center">
                  <Switch>
                    <PrivateRoute path='/' exact component={ServiceProviderHome} authed={this.state.authed} />
                    <PrivateRoute path='/serviceproviderhome' component={ServiceProviderHome} authed={this.state.authed} />
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
                <div className="d-flex justify-content-center">
                  <Switch>
                    <PrivateRoute path='/' exact component={UserHome} authed={this.state.authed} />
                    <PrivateRoute path='/home' component={UserHome} authed={this.state.authed} />
                    <PrivateRoute path='/newappointmentform' component={NewAppointmentForm} authed={this.state.authed} />
                    <PrivateRoute path='/pickdate' component={PickDate} authed={this.state.authed} />
                    <PrivateRoute path='/appointments' component={Appointments} authed={this.state.authed} />
                    <PublicRoute path='/newmemberform' component={NewMemberForm} authed={this.state.authed} />
                    <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                    <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                  </Switch>
                </div>
            </React.Fragment>
          </BrowserRouter>
          <MyFooter />
        </div>
      );
    }
  }
}

export default App;
