import axios from 'axios';

import {HOUSES_FETCH_SUCCESS} from './types';

export const housesFetch = (page = 1) => {
  return dispatch => {
    axios
      .get('https://abujaapartments.com.ng/api/v1/houses/' + page)
      .then(response => {
        //console.log(response.data);
        dispatch({type: HOUSES_FETCH_SUCCESS, payload: response.data});
      })
      .catch(function(error) {
        console.log(response.data);
        console.log(
          'There has been a problem with your fetch operation: ' +
            error,
        );
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
