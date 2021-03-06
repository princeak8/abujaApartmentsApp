import {
    LOCATIONS_FETCH_SUCCESS
} from '../Actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    //console.log('location reducer', action);
    //console.log('locations payload: ', action.payload);
    //console.log('action type: ', action);
    switch (action.type) {
        case LOCATIONS_FETCH_SUCCESS:    
            return action.payload;
        default:
            return state;
    }
};