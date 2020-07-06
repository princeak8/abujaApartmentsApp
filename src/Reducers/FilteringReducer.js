import {
    FILTERING,
    ABORT_FILTERING,
} from '../Actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
    //console.log('house type reducer', action);
    
    switch (action.type) {
        case FILTERING:
            return true;
        case ABORT_FILTERING:
            return false;
        default:
            return state;
    }
};