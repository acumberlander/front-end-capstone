import PropTypes from 'prop-types';

const appointmentShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
});


export default appointmentShape;
