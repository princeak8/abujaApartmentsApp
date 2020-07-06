import axios from 'axios';

import {REALTOR_PAGE} from './types';

export const realtorPortfolio = profile_name => {
  var formData = {profile_name: profile_name};
  return dispatch => {
    axios
      .get('https://abujaapartments.com.ng/api/v1/' + profile_name)
      .then(response => {
        dispatch({type: REALTOR_PAGE, payload: response.data});
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        throw error;
      });
  };
};
