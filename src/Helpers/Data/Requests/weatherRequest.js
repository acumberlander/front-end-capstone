import axios from 'axios';
import apiKeys from '../apiKeys';


const baseUrl = apiKeys.baseUrl;

// What the path should look like
// http://api.openweathermap.org/data/2.5/forecast?zip=37138&appid=8f3d1c0d9a35e01914f14fdace149a84  
    const getForecast = (zip) => new Promise((resolve, reject) => {
      axios.get(`${baseUrl}${zip}&appid=${apiKeys.weatherApiKey}`)
        .then((result) => {
          if (result.data === '') {
            resolve('noData');
            console.log(result.data);
          } else {
            resolve(result);
            console.log(result.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });




export default getForecast;