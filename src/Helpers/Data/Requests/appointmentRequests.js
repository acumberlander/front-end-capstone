import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllAppointments = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/appointments.json`)
    .then((result) => {
      const appointmentObject = result.data;
      const appointmentArray = [];
      if (appointmentObject != null) {
        Object.keys(appointmentObject).forEach((appointmentId) => {
          appointmentObject[appointmentId].id = appointmentId;
          appointmentArray.push(appointmentObject[appointmentId]);
        });
      }
      resolve(appointmentArray);
    })
    .catch((error) => {
      reject(error);
    });
});
const deleteAppointment = appointmentId => axios.delete(`${firebaseUrl}/appointments/${appointmentId}.json`);

const postRequest = newAppointment => axios.post(`${firebaseUrl}/appointments.json`, newAppointment);

const getAppointmentItem = appointmentId => axios.get(`${firebaseUrl}/appointments/${appointmentId}.json`);

const updateAppointment = (appointmentId, appointment) => axios.put(`${firebaseUrl}/appointments/${appointmentId}.json`, appointment);

export default {
  getAllAppointments,
  deleteAppointment,
  postRequest,
  getAppointmentItem,
  updateAppointment,
};
