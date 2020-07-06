import {
    PRICERANGE_CHECK,
    HOUSETYPE_CHECK,
    LOCATION_CHECK,
    STATUS_CHECK,
    FILTER
} from '../Actions/types';

const INITIAL_STATE = { 
    price_range_id : [],
    house_type_id : [],
    location_id : [],
    status : 'all',
    filteredHouses: [],
    totalNum: 0,
    limit: 0,
    noPages: 0,
};

export default (state= INITIAL_STATE, action) => {
        //console.log('searchResult ', action.payload);
        //console.log('filter reducer', action);
        switch (action.type) {
            case PRICERANGE_CHECK:
                //console.log('price range ', action.payload);
                const priceRangeArray = process_checkbox(state.price_range_id, action.payload);
                //console.log('price range ', priceRangeArray);
                return { ...state, price_range_id: priceRangeArray};
            case HOUSETYPE_CHECK:
                const houseTypeArray = process_checkbox(state.house_type_id, action.payload);
                return { ...state, house_type_id: houseTypeArray};
            case LOCATION_CHECK:
                const locationArray = process_checkbox(state.location_id, action.payload);
                return { ...state, location_id: locationArray};
            case STATUS_CHECK:
                return { ...state, status: action.payload};
            case FILTER:
                const result = process_filterResult_data(action.payload);
                if (state.filteredHouses && state.noPages > 1) {
                    //console.log('searchResult ', action.payload);
                    var newHouses = [...state.filteredHouses, ...action.payload.houses];
                } else {
                    //console.log('searchResults ', action.payload);
                    var newHouses = action.payload.houses;
                }
                var filteredBy = '';
                
                return { 
                    ...state, 
                    filteredHouses: newHouses,
                    totalNum: action.payload.meta.totalNum,
                    limit: action.payload.meta.limit,
                    noPages: action.payload.meta.noPages,
                };
            default:
                return state;
        }
}

function get_filtered_by(state)
{
    var filteredBy = '';
    if(state.status != 'all') {
        filteredBy = state.status+' ';
    }
    if(state.location_id.length > 0) {
        state.location_id.forEach(function() {
            //
        })
    }
}

function process_checkbox(checkboxArray, id)
{
    if(checkboxArray.includes(id)) {
        var index = checkboxArray.indexOf(id);
        if (index > -1) {
            checkboxArray.splice(index, 1);
        }
    }else{
        checkboxArray.push(id);
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
