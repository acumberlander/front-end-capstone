import axios from 'axios';
import apiKeys from '../apiKeys';


const baseUrl = apiKeys.baseUrl;
const weatherApiKey = apiKeys.weatherApiKey;
const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

// What the path should look like
// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&units=i&key=API_KEY
    const getForecast = (city, state) => new Promise((resolve, reject) => {
      axios.get(`${baseUrl}?city=${city},${state}&units=i&key=${weatherApiKey}`)
        .then((result) => {
          if (result === '') {
            resolve('noData');
          } else {
            const forecast16 = result.data.data;
            console.log(result)
            resolve(forecast16);
          }
        })
        .catch((error) => {
          reject(error);
        });
});


const getWeather = uid => new Promise ((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      console.log("result");
      const weatherObject = result;
      const weatherArray = [];
      if (weatherObject != null) {
        Object.keys(weatherObject).forEach((weatherId) => {
          weatherObject[weatherId].id = weatherId;
          weatherArray.push(weatherObject[weatherId]);
        });
      }
      resolve(weatherArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const postRequest = weather => axios.post(`${firebaseUrl}/weather.json`, weather);

export default 
{
  getForecast,
  postRequest,
  getWeather
};