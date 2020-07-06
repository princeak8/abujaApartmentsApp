import {
    HOUSETYPES_FETCH_SUCCESS
} from '../Actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    //console.log('house type reducer', action);
    
    switch (action.type) {
        case HOUSETYPES_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};