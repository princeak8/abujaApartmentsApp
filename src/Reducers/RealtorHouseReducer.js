import {
    REALTOR_PAGE
} from '../Actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    //console.log('realtor reducer', action);
    
    switch (action.type) {
        case REALTOR_PAGE:
            return action.payload.data.houses;
        default:
            return state;
    }
}
