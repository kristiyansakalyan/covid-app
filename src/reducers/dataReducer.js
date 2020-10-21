const INITIAL_STATE = {
    data: {},
    error: null,
    loading: true
};

export const dataReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return {...state, loading: false, error: false, data: action.payload};
        case 'FETCH_DATA_ERROR':
            return {...state, loading: false , error: action.payload}
        case 'FETCH_DATA_REQUESTED':
            return {...state, loading: true}
        default:
            return state;
    }
}