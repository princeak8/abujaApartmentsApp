import axios from 'axios';

import { 
    SEARCH_CHANGED,
    SEARCHING
} from './types';

export const search = (text) => {
    var formData = {'search_realtor': text};
    return (dispatch) => {
        axios.post('https://abujaapartments.com.ng/api/v1/search_realtor', formData)
            .then(response => {
                dispatch({ type: SEARCH_CHANGED, payload: response.data });
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
        });
    }
};

export const searching = (text) => {
    return {
        type: SEARCHING,
        payload: text
    };
}