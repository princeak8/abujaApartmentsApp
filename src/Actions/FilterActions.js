import axios from 'axios';

import {
  PRICERANGE_CHECK,
  HOUSETYPE_CHECK,
  LOCATION_CHECK,
  LOCATION_NAME_CHECK,
  HOUSETYPE_NAME_CHECK,
  PRICERANGE_NAME_CHECK,
  STATUS_CHECK,
  FILTERING,
  ABORT_FILTERING,
  FILTER,
} from './types';

export const priceRangeCheck = id => {
  //console.log('price_range_check ', id);
  return {
    type: PRICERANGE_CHECK,
    payload: id,
  };
};

export const houseTypeCheck = id => {
  return {
    type: HOUSETYPE_CHECK,
    payload: id,
  };
};

export const locationCheck = id => {
  return {
    type: LOCATION_CHECK,
    payload: id,
  };
};

export const locationNameCheck = name => {
  return {
    type: LOCATION_NAME_CHECK,
    payload: name,
  };
};

export const houseTypeNameCheck = name => {
  return {
    type: HOUSETYPE_NAME_CHECK,
    payload: name,
  };
};

export const priceRangeNameCheck = name => {
  return {
    type: PRICERANGE_NAME_CHECK,
    payload: name,
  };
};

export const statusCheck = status => {
  return {
    type: STATUS_CHECK,
    payload: status,
  };
};

export const triggerFiltering = () => {
  return {
    type: FILTERING,
    payload: true,
  };
};

export const abortFiltering = () => {
  return {
    type: ABORT_FILTERING,
    payload: false,
  };
};

export const filter = (filters, page=1) => {
  var formData = {filters, page};

  console.log('filters+ ', filters);
  console.log('page ', page);
  return dispatch => {
    axios
      .post('https://abujaapartments.com.ng/api/v1/filter_app_houses', formData)
      .then(response => {
        //console.log('Filter ',response.data);
         dispatch({type: FILTER, payload: response.data});
      })
      .catch(function(error) {
        console.log('Error ',error)
        //console.log('There has been a problem with your fetch operation: ' + error.message);
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
