import { combineReducers } from 'redux';
import { dataReducer } from './dataReducer';
import { byCountryDataReducer } from './byCountryDataReducer';
import { allCountriesReducer } from './allCountriesReducer';

export default combineReducers({
    data: dataReducer,
    byCountryData: byCountryDataReducer,
    allCountries: allCountriesReducer
});