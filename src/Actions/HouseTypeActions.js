import axios from 'axios';

import {HOUSETYPES_FETCH_SUCCESS} from './types';

export const houseTypesFetch = () => {
  return dispatch => {
    axios
      .get('https://abujaapartments.com.ng/api/v1/house_types')
      .then(response => {
        dispatch({type: HOUSETYPES_FETCH_SUCCESS, payload: response.data});
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
