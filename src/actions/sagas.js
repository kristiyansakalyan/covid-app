import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchGlobalData, fetchByCountryData, fetchAllCountries } from '../apis/covidapi';
import {
    FETCH_DATA_ERROR,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_BYCOUNTRY_DATA_REQUEST,
    FETCH_BYCOUNTRY_DATA_SUCCESS,
    FETCH_BYCOUNTRY_DATA_ERROR,
    FETCH_ALLCOUNTRIES_REQUEST,
    FETCH_ALLCOUNTRIES_SUCCESS,
    FETCH_ALLCOUNTRIES_ERROR
} from './types';

function* fetchGlobalDataSaga() {
    try {
        const data = yield call(fetchGlobalData);
        yield put({type: FETCH_DATA_SUCCESS, payload: data.data});
    } catch(e) {
        yield put({type: FETCH_DATA_ERROR, payload: e.message})
    }
}

function* fetchByCountryDataSaga(action) {
    try {
        const data = yield call(fetchByCountryData, action.payload);
        yield put({type: FETCH_BYCOUNTRY_DATA_SUCCESS, payload: data});
    } catch (error) {
        yield put({type: FETCH_BYCOUNTRY_DATA_ERROR, payload: ''})
    }
}

function* fetchAllCountriesSaga() {
    try {
        const data = yield call(fetchAllCountries);
        yield put({type: FETCH_ALLCOUNTRIES_SUCCESS, payload: data.data });
    } catch(e) {
        yield put({type: FETCH_ALLCOUNTRIES_ERROR, payload: e.message})
    }
}


function* mySaga() {
    yield takeEvery(FETCH_DATA_REQUEST, fetchGlobalDataSaga);
    yield takeEvery(FETCH_BYCOUNTRY_DATA_REQUEST,fetchByCountryDataSaga);
    yield takeEvery(FETCH_ALLCOUNTRIES_REQUEST, fetchAllCountriesSaga);
}

export default mySaga;