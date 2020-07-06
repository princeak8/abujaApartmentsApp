import {
    PRICERANGE_NAME_CHECK,
    HOUSETYPE_NAME_CHECK,
    LOCATION_NAME_CHECK,
    STATUS_CHECK,
} from '../Actions/types';

const INITIAL_STATE = { 
    price_ranges : [],
    house_types : [],
    locations : [],
};

export default (state= INITIAL_STATE, action) => {
        //console.log('searchResult ', action.payload);
        //console.log('filter reducer', action);
        switch (action.type) {
            case PRICERANGE_NAME_CHECK:
                const priceRanges = process_checkbox(state.price_ranges, action.payload);
                return { ...state, price_ranges: priceRanges};
            case HOUSETYPE_NAME_CHECK:
                const houseTypes = process_checkbox(state.house_types, action.payload);
                return { ...state, house_types: houseTypes};
            case LOCATION_NAME_CHECK:
                const locations = process_checkbox(state.locations, action.payload);
                return { ...state, locations: locations};
            default:
                return state;
        }
}

function process_checkbox(checkboxArray, name)
{
    if(checkboxArray.includes(name)) {
        var index = checkboxArray.indexOf(name);
        if (index > -1) {
            checkboxArray.splice(index, 1);
        }
    }else{
        checkboxArray.push(name);
    }
    return checkboxArray;
}

const process_filterResult_data = (result) => {
    if(result.status_code == 200) {
        if(result.data.length==0) {
            return 'No result was found for the above filter';
        }else{
            return result.data;
        }
    }else if(result.status_code == 404){
        return result.message;
    }else{
        return 'Seems like an error occured.. please try again';
    }
}
