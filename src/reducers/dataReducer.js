import {
    FETCH_DATA_ERROR,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS
} from '../actions/types';


const INITIAL_STATE = {
    data: undefined,
    error: null,
    loading: true
};

export const dataReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {...state, loading: false, error: false, data: action.payload};
        case FETCH_DATA_ERROR:
            return {...state, loading: false , error: action.payload}
        case FETCH_DATA_REQUEST:
            return {...state, loading: true}
        default:
            return state;
    }
}