import {SIMILAR_HOUSES_FETCH_SUCCESS} from '../Actions/types';

const INITIAL_STATE = {
  houses: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log('house reducer', action);

  switch (action.type) {
    case SIMILAR_HOUSES_FETCH_SUCCESS:
      //return action.payload;
      //return { ...state, ...action.payload };
      if (state.houses) {
        var newHouses = [...state.houses, ...action.payload.houses];
      } else {
        var newHouses = action.payload.houses;
      }
      console.log('similar house reducers ', action.payload);
      return {
        houses: newHouses
      };

    default:
      return state;
  }
};
