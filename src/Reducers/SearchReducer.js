import {
    SEARCH_CHANGED,
    SEARCHING
} from '../Actions/types';

const INITIAL_STATE = { 
    data: '',
    text: '',
    searching: 0 
};

export default (state= INITIAL_STATE, action) => {
        //console.log('searchResult ', action.payload);
        switch (action.type) {
            case SEARCH_CHANGED:
                const result = process_searchResult_data(action.payload);
                return { ...state, searching: 2, data: result };
            case SEARCHING:
                return { ...state, searching: 1, text: action.payload};
            default:
                return state;
        }
}

const process_searchResult_data = (result) => {
    if(result.status_code == 200) {
        if(result.data.length == 0) {
            return result.message;
        }else{
            return result.data;
        }
    }else{
        return 'Seems like an error occured.. please try again';
    }
}