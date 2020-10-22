import {
    FETCH_ALLCOUNTRIES_REQUEST,
    FETCH_ALLCOUNTRIES_SUCCESS,
    FETCH_ALLCOUNTRIES_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    data: undefined,
    error: null,
    loading: true
};

export const allCountriesReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALLCOUNTRIES_SUCCESS:
            return {...state, loading: false, error: false, data: action.payload};
        case FETCH_ALLCOUNTRIES_ERROR:
            return {...state, loading: false , error: action.payload}
        case FETCH_ALLCOUNTRIES_REQUEST:
            return {...state, loading: true}
        default:
            return state;
    }
}