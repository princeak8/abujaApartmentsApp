import {combineReducers} from 'redux';
import HouseReducer from './HouseReducer';
import LocationReducer from './LocationReducer';
import HouseTypeReducer from './HouseTypeReducer';
import PriceRangeReducer from './PriceRangeReducer';
import SearchReducer from './SearchReducer';
import FilterReducer from './FilterReducer';
import FilteredReducer from './FilteredReducer';
import FilteringReducer from './FilteringReducer';
import RealtorHouseReducer from './RealtorHouseReducer';

export default combineReducers({
  houses: HouseReducer,
  locations: LocationReducer,
  house_types: HouseTypeReducer,
  price_ranges: PriceRangeReducer,
  searchResult: SearchReducer,
  filters: FilterReducer,
  filtered: FilteredReducer,
  filtering: FilteringReducer,
  realtorHouses: RealtorHouseReducer,
});
