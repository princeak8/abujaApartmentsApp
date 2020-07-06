import axios from 'axios';

import {PRICERANGES_FETCH_SUCCESS} from './types';

export const priceRangesFetch = () => {
  return dispatch => {
    axios
      .get('https://abujaapartments.com.ng/api/v1/price_ranges')
      .then(response => {
        dispatch({type: PRICERANGES_FETCH_SUCCESS, payload: response.data});
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
