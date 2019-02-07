import React from 'react';
// import PropTypes from 'prop-types';
import appointmentShape from '../../../../Helpers/Data/props/appointmentShape';
import './ServiceAppListItem.scss';
// import moment from 'moment';
// import authRequests from '../../../../Helpers/Data/authRequests';
// import appointmentRequests from '../../../../Helpers/Data/Requests/appointmentRequests';
  
class ServiceAppListItem extends React.Component {
  static propTypes = {
    appointment: appointmentShape,
  }

  render() {
    const { appointment } = this.props;
    return (
      <div className="card row">
        <div className="serviceAppListItem">
            <span className="col-3">{appointment.firstName}</span>
        </div>
      </div>
    );
  }
}

export default ServiceAppListItem;
