import {HOUSES_FETCH_SUCCESS} from '../Actions/types';

const INITIAL_STATE = {
  loadedHouses: null,
  totalNum: 0,
  limit: 0,
  noPages: 0,
};

export default (state = INITIAL_STATE, action) => {
  //console.log('house reducer', action);

  switch (action.type) {
    case HOUSES_FETCH_SUCCESS:
      //return action.payload;
      //return { ...state, ...action.payload };
      if (state.loadedHouses) {
        var newHouses = [...state.loadedHouses, ...action.payload.houses];
      } else {
        var newHouses = action.payload.houses;
      }
      console.log('house reducers ', action.payload);
      return {
        loadedHouses: newHouses,
        totalNum: action.payload.meta.totalNum,
        limit: action.payload.meta.limit,
        noPages: action.payload.meta.noPages,
      };

    default:
      return state;
  }
};
