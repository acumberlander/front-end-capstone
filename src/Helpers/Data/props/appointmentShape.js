import PropTypes from 'prop-types';

const appointmentShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  date: PropTypes.any.isRequired,
  time: PropTypes.any.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  acres: PropTypes.any.isRequired,
  price: PropTypes.any.isRequired,
});


export default appointmentShape;
