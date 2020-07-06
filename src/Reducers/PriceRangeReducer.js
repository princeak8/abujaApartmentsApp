import {
    PRICERANGES_FETCH_SUCCESS
} from '../Actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    //console.log('price range reducer', action);
    
    switch (action.type) {
        case PRICERANGES_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};