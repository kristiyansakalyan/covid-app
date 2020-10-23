import {
    FETCH_BYCOUNTRY_DATA_REQUEST,
    FETCH_BYCOUNTRY_DATA_SUCCESS,
    FETCH_BYCOUNTRY_DATA_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    data: undefined,
    error: null,
    loading: undefined
};

export const byCountryDataReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BYCOUNTRY_DATA_SUCCESS:
            return {...state, loading: false, error: false, data: action.payload};
        case FETCH_BYCOUNTRY_DATA_ERROR:
            return {...state, loading: false , error: action.payload}
        case FETCH_BYCOUNTRY_DATA_REQUEST:
            return {...state, loading: true}
        default:
            return state;
    }
};