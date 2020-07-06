import axios from 'axios';

import {LOCATIONS_FETCH_SUCCESS} from './types';

export const locationsFetch = () => {
  return dispatch => {
    axios
      .get('https://abujaapartments.com.ng/api/v1/locations')
      .then(response => {
        dispatch({type: LOCATIONS_FETCH_SUCCESS, payload: response.data});
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  };
};
